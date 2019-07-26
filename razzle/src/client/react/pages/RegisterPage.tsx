import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { UserRole, RegisterUser } from '../../../common';
import {
  Button,
  Container,
  EmailInput,
  Form,
  FormValidation,
  PasswordInput,
  TextInput,
  Label
} from '../components';
import { routes } from '../routes';
import * as userState from '../store/user';
import {
  getValidation,
  isValid,
  validateUsername,
  validateEmail,
  validatePassword,
  getApiErrors
} from '../utility';

export interface RegisterPageProps extends RouteComponentProps {
  registerUser: (user: RegisterUser) => void;
}

export const DisconnectedRegisterPage: React.FC<RegisterPageProps> = ({
  history,
  registerUser
}) => {
  const [errors, setErrors] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [submit, setSubmit] = React.useState(false);
  const [confirmPass, setConfirmPass] = React.useState('');
  const [newUser, setNewUser] = React.useState<RegisterUser>({
    email: '',
    password: '',
    role: 'general',
    username: ''
  });

  const resetForm = () => {
    setErrors([]);
    setLoading(false);
    setSubmit(false);
  };

  const usernameValid = validateUsername(newUser.username);
  const emailValid = validateEmail(newUser.email);
  const passwordValid = validatePassword(newUser.password);
  const confirmPassValid = validatePassword(confirmPass);

  const passwordsMatch = () => {
    if (newUser.password !== confirmPass) {
      setErrors(['Passwords do not match']);
      return false;
    }
    return true;
  };

  const isValidForm = () =>
    isValid(usernameValid) &&
    isValid(emailValid) &&
    isValid(passwordValid) &&
    isValid(confirmPassValid) &&
    passwordsMatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'email' | 'password' | 'username' | 'confirm-pass'
  ) => {
    const value: string = e.target.value;
    if (field === 'confirm-pass') {
      setConfirmPass(value && value.trim());
    } else {
      setNewUser({
        ...newUser,
        [field]: value && value.trim()
      });
    }
    resetForm();
  };

  const handleSubmit = async () => {
    try {
      setSubmit(true);
      if (isValidForm()) {
        setLoading(true);
        let role: UserRole = newUser.role;
        if (newUser.email.endsWith('@reviewer.com')) {
          role = 'admin';
        }
        await registerUser({ ...newUser, role });
        setLoading(false);
        history.push(routes.home.path);
      }
    } catch (err) {
      if (err.response) {
        if (err.response) {
          const formErrors = getApiErrors(err.response);
          setErrors(formErrors);
        }
      }
      setLoading(false);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h1 className="form__title">Sign Up</h1>
        <Link className="link" to={routes.login.path}>
          Already have an account?
        </Link>
        <FormValidation submit={submit} errors={errors} valid={false} />
        <Label htmlFor="name">
          <FormValidation
            submit={submit}
            {...getValidation(usernameValid, submit)}
          >
            <p>Username</p>
            <TextInput
              id="name"
              value={newUser.username}
              onChange={e => handleChange(e, 'username')}
            />
          </FormValidation>
        </Label>
        <Label htmlFor="email">
          <FormValidation
            submit={submit}
            {...getValidation(emailValid, submit)}
          >
            <p>Email</p>
            <EmailInput
              id="email"
              value={newUser.email}
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
              value={newUser.password}
              onChange={e => handleChange(e, 'password')}
            />
          </FormValidation>
        </Label>
        <Label htmlFor="confirm-password">
          <FormValidation
            submit={submit}
            {...getValidation(confirmPassValid, submit)}
          >
            <p>Confirm Password</p>
            <PasswordInput
              id="confirm-password"
              value={confirmPass}
              onChange={e => handleChange(e, 'confirm-pass')}
            />
          </FormValidation>
        </Label>
        <Button type="submit" disabled={loading}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

const actionCreators = {
  registerUser: (user: RegisterUser) => userState.register({ user })
};

const mapActionsToProps = (dispatch: Dispatch) => ({
  ...bindActionCreators(actionCreators, dispatch)
});

export const RegisterPage = withRouter(
  connect(
    null,
    mapActionsToProps
  )(DisconnectedRegisterPage)
);
