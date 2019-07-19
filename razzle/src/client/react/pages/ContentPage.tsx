import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Content } from '../../../common';
import { Container, Layout } from '../components';
import { user1 } from '../../mock';

export interface ContentPageProps extends RouteComponentProps<{ id: string }> {
  content: Content;
}

export const DisconnectedContentPage: React.FC<ContentPageProps> = ({
  history,
  match
}) => {
  React.useEffect(() => {}, [match.params.id]);

  return (
    <Layout user={user1}>
      {match.params.id ? (
        <Container>content for {match.params.id}</Container>
      ) : (
        <Container>content</Container>
      )}
    </Layout>
  );
};

export const ContentPage = withRouter(DisconnectedContentPage);
