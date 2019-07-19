import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Container, Layout } from '../components';

export interface LoginPageProps extends RouteComponentProps<{}> {}

export const DisconnectedLoginPage: React.FC<LoginPageProps> = ({
  history
}) => {
  return (
    <Layout>
      <Container>Login</Container>
    </Layout>
  );
};

export const LoginPage = withRouter(DisconnectedLoginPage);
