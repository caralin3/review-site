import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Content, User, ContentType } from '../../../common';
import {
  Banner,
  Container,
  Layout,
  Tab,
  TabList,
  TabPanel,
  ContentPreview,
  ContentPreviewList
} from '../components';
import { content, user1 } from '../../mock';

export interface ContentPageProps extends RouteComponentProps<{ id?: string }> {
  allContent: {
    content: Content[];
    contentCount: number;
  };
  currContent?: Content;
  user?: User;
}

export const DisconnectedContentPage: React.FC<ContentPageProps> = ({
  allContent,
  currContent,
  history,
  location,
  match,
  user
}) => {
  const [type, setType] = React.useState<ContentType>('Movie');

  React.useEffect(() => {
    if (location.pathname.includes('movies')) {
      setType('Movie');
    } else if (location.pathname.includes('shows')) {
      setType('Series');
    }
  }, [location.pathname, match.params.id]);

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

  return (
    <Layout user={user1}>
      {match.params.id ? (
        <Container>content for {match.params.id}</Container>
      ) : (
        <ContentList
          allContent={content} // @TODO: Replace with allContent prop
          handleRating={handleRating}
          handleWatch={handleWatch}
          type={type}
          user={user1}
        />
      )}
    </Layout>
  );
};

export const ContentPage = withRouter(DisconnectedContentPage);

export interface ContentListProps {
  allContent: {
    content: Content[];
    contentCount: number;
  };
  handleRating: (value: number, id: string) => void;
  handleWatch: (watching: boolean) => void;
  type: ContentType;
  user?: User;
}

export const ContentList: React.FC<ContentListProps> = ({
  allContent,
  handleRating,
  handleWatch,
  type,
  user
}) => {
  const [tab, setTab] = React.useState<'movie' | 'show' | 'watch'>('movie');
  const watchTab = React.useRef(null);
  const movieTab = React.useRef(null);
  const showTab = React.useRef(null);

  React.useEffect(() => {
    if (user) {
      setTab('watch');
    } else {
      if (type === 'Series') {
        setTab('show');
      }
    }
  }, [type]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.keyCode === 37 || e.keyCode === 39) {
      if (document.activeElement && document.activeElement.id === 'watch') {
        if (type === 'Movie') {
          if (movieTab && movieTab.current) {
            (movieTab.current as any).focus();
          }
        } else {
          if (showTab && showTab.current) {
            (showTab.current as any).focus();
          }
        }
      } else if (
        document.activeElement &&
        document.activeElement.id === 'movie'
      ) {
        if (watchTab && watchTab.current) {
          (watchTab.current as any).focus();
        }
      } else if (
        document.activeElement &&
        document.activeElement.id === 'show'
      ) {
        if (watchTab && watchTab.current) {
          (watchTab.current as any).focus();
        }
      }
    }
  };

  return (
    <>
      <Banner>
        <i className="fas fa-film banner__icon" />
        <h1 className="banner__brand">Featured</h1>
      </Banner>
      <Container>
        <TabList>
          {user && (
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
          )}
          {type === 'Movie' && (
            <Tab
              id="movie"
              innerRef={movieTab}
              panelId="movie-panel"
              selected={tab}
              onClick={() => setTab('movie')}
              onKeyDown={handleKeyDown}
            >
              Movies
            </Tab>
          )}
          {type === 'Series' && (
            <Tab
              id="show"
              innerRef={showTab}
              panelId="show-panel"
              selected={tab}
              onClick={() => setTab('show')}
              onKeyDown={handleKeyDown}
            >
              TV Shows
            </Tab>
          )}
        </TabList>
        {user && (
          <TabPanel selected={tab} id="watch-list" tabId="watch">
            <ContentPreviewList
              contentList={allContent.content.filter(
                con => con.watchList && con.type === type
              )}
              handleRating={handleRating}
              handleWatch={handleWatch}
              user={user}
            />
          </TabPanel>
        )}
        {type === 'Movie' && (
          <TabPanel selected={tab} id="movie-panel" tabId="movie">
            <ContentPreviewList
              contentList={allContent.content.filter(
                con => con.type === 'Movie'
              )}
              handleRating={handleRating}
              handleWatch={handleWatch}
              user={user}
            />
          </TabPanel>
        )}
        {type === 'Series' && (
          <TabPanel selected={tab} id="show-panel" tabId="show">
            <ContentPreviewList
              contentList={allContent.content.filter(
                con => con.type === 'Series'
              )}
              handleRating={handleRating}
              handleWatch={handleWatch}
              user={user}
            />
          </TabPanel>
        )}
      </Container>
    </>
  );
};
