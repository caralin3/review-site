import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Container, Layout } from '../components';

export interface RegisterPageProps extends RouteComponentProps<{}> {}

export const DisconnectedRegisterPage: React.FC<RegisterPageProps> = ({
  history
}) => {
  return (
    <Layout>
      <Container>Register</Container>
    </Layout>
  );
};

export const RegisterPage = withRouter(DisconnectedRegisterPage);
