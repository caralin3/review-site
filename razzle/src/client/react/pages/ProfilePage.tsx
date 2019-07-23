import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  Banner,
  Container,
  Layout,
  Tab,
  TabList,
  TabPanel,
  ContentPreviewList
} from '../components';
import { admin1, content, user1, author1 } from '../../mock';
import { routes } from '../routes';

export interface ProfilePageProps
  extends RouteComponentProps<{ username: string }> {}

export const DisconnectedProfilePage: React.FC<ProfilePageProps> = ({
  match: { params }
}) => {
  const [tab, setTab] = React.useState<'reviewed' | 'watch'>('watch');
  const watchTab = React.useRef(null);
  const reviewedTab = React.useRef(null);

  const user = undefined;
  const admin = admin1;

  React.useEffect(() => {
    // loadProfile(params.username);
  }, [params.username]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.keyCode === 37 || e.keyCode === 39) {
      if (document.activeElement && document.activeElement.id === 'watch') {
        if (reviewedTab && reviewedTab.current) {
          (reviewedTab.current as any).focus();
        }
      } else if (
        document.activeElement &&
        document.activeElement.id === 'reviewed'
      ) {
        if (watchTab && watchTab.current) {
          (watchTab.current as any).focus();
        }
      }
    }
  };

  const handleRating = (value: number, id: string) => {
    if (user) {
      console.log('Rating ', value, id);
    }
  };

  const handleWatch = (watching: boolean) => {
    if (user) {
      console.log('Watching ', watching);
    }
  };

  const author = author1;

  return (
    <Layout user={admin}>
      <Banner>
        <img src={author.image} alt={`${author.username}`} />
        <h1 className="banner__brand">{author.username}</h1>
        <p className="banner__text">{author.bio}</p>
      </Banner>
      <Container>
        <TabList>
          <Tab
            id="watch"
            innerRef={watchTab}
            panelId="watch-list"
            selected={tab}
            onClick={() => setTab('watch')}
            onKeyDown={handleKeyDown}
          >
            Watch List
          </Tab>
          <Tab
            id="reviewed"
            innerRef={reviewedTab}
            panelId="reviewed-panel"
            selected={tab}
            onClick={() => setTab('reviewed')}
            onKeyDown={handleKeyDown}
          >
            Reviewed
          </Tab>
        </TabList>
        <TabPanel selected={tab} id="watch-list" tabId="watch">
          <ContentPreviewList
            contentList={content.content.filter(con => con.watchList)}
            handleRating={handleRating}
            handleWatch={handleWatch}
            user={user}
          />
        </TabPanel>
        <TabPanel selected={tab} id="reviewed-panel" tabId="reviewed">
          <ContentPreviewList
            // @TODO: Filter reviewed content
            contentList={content.content}
            handleRating={handleRating}
            handleWatch={handleWatch}
            user={user}
          />
        </TabPanel>
      </Container>
    </Layout>
  );
};

export const ProfilePage = withRouter(DisconnectedProfilePage);