import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  EmailInput,
  Form,
  FormValidation,
  Layout,
  PasswordInput,
  Label
} from '../components';
import { routes } from '../routes';
import {
  getValidation,
  isValid,
  validateEmail,
  validatePassword
} from '../utility';

export interface LoginUser {
  email: string;
  password: string;
}

export interface LoginPageProps extends RouteComponentProps {
  // loginUser: (user: LoginUser) => void;
}

export const DisconnectedLoginPage: React.FC<LoginPageProps> = ({
  history
}) => {
  const [errors, setErrors] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [submit, setSubmit] = React.useState(false);
  const [loginUser, setLoginUser] = React.useState<LoginUser>({
    email: '',
    password: ''
  });

  const resetForm = () => {
    setErrors([]);
    setLoading(false);
    setSubmit(false);
  };

  const emailValid = validateEmail(loginUser.email);
  const passwordValid = validatePassword(loginUser.password);

  const isValidForm = () => isValid(emailValid) && isValid(passwordValid);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'email' | 'password'
  ) => {
    const value: string = e.target.value;
    setLoginUser({
      ...loginUser,
      [field]: value && value.trim()
    });
    resetForm();
  };

  const handleSubmit = async () => {
    try {
      setSubmit(true);
      if (isValidForm()) {
        setLoading(true);
        console.log('Valid', loginUser);
        // @TODO: Dispatch redux action
        // await loginUser(loginUser);
        history.push(routes.home.path);
      }
    } catch (err) {
      console.error(err);
      if (err.response) {
        const apiErrors = err.response.data.errors;
        const formErrors: string[] = [];
        Object.keys(apiErrors).forEach(key => {
          if (apiErrors) {
            formErrors.push(`${key} ${apiErrors[key]}`);
          }
        });
        setErrors(formErrors);
      }
    }
    setLoading(false);
  };

  return (
    <Layout>
      <Container>
        <Form onSubmit={handleSubmit}>
          <h1 className="form__title">Sign Up</h1>
          <Link className="link" to={routes.register.path}>
            Already have an account?
          </Link>
          <FormValidation submit={submit} errors={errors} valid={false} />
          <Label htmlFor="email">
            <FormValidation
              submit={submit}
              {...getValidation(emailValid, submit)}
            >
              <p>Email</p>
              <EmailInput
                id="email"
                value={loginUser.email}
                onChange={e => handleChange(e, 'email')}
              />
            </FormValidation>
          </Label>
          <Label htmlFor="password">
            <FormValidation
              submit={submit}
              {...getValidation(passwordValid, submit)}
            >
              <p>Password</p>
              <PasswordInput
                id="password"
                value={loginUser.password}
                onChange={e => handleChange(e, 'password')}
              />
            </FormValidation>
          </Label>
          <Button type="submit" disabled={loading}>
            Submit
          </Button>
        </Form>
      </Container>
    </Layout>
  );
};

export const LoginPage = withRouter(DisconnectedLoginPage);
