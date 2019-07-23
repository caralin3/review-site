import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Content, User, ContentType, Episode } from '../../../common';
import {
  Banner,
  Container,
  Layout,
  Tab,
  TabList,
  TabPanel,
  ContentDetails,
  ContentPreviewList,
  EpisodeItem,
  ReviewEditor
} from '../components';
import { content as mockContent, user1, show1, episodes } from '../../mock';

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
  match: { params },
  user
}) => {
  const [curCon, setCurCon] = React.useState<Content>({} as Content);
  const [type, setType] = React.useState<ContentType>('Movie');

  React.useEffect(() => {
    if (params && params.id) {
      // loadContent(params.id);
      const [con] = mockContent.content.filter(con => con.id === params.id);
      setCurCon(con);
    }
    if (location.pathname.includes('movies')) {
      setType('Movie');
    } else if (location.pathname.includes('shows')) {
      setType('Series');
    }
  }, [location.pathname, params.id]);

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
      {params.id ? (
        <Container>
          <ContentItem
            content={curCon}
            episodes={episodes}
            handleRating={handleRating}
            handleWatch={handleWatch}
            user={user1}
          />
        </Container>
      ) : (
          <ContentList
            allContent={mockContent} // @TODO: Replace with allContent prop
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

export interface ContentItemProps {
  content: Content;
  episodes?: {
    episodes: Episode[];
    episodesCount: number;
  };
  handleRating: (value: number, id: string) => void;
  handleWatch: (watching: boolean) => void;
  user?: User;
}

export const ContentItem: React.FC<ContentItemProps> = ({
  content,
  episodes,
  handleRating,
  handleWatch,
  user
}) => {
  return (
    <div className="profile-page">
      <section>
        <ContentDetails
          content={content}
          onRate={val => handleRating(val, content.id)}
          onWatch={() => handleWatch(content.watchList)}
        />
      </section>
      <section>
        <h2 className="profile-page__header">Episodes</h2>
        <ul className="episode-item__list">
          {episodes &&
            episodes.episodes.length > 0 &&
            episodes.episodes.map(ep => (
              <li className="episode-item__list-item" key={ep.id}>
                <EpisodeItem episode={ep} />
              </li>
            ))}
        </ul>
      </section>
      <section>
        <h2 className="profile-page__header">Reviews</h2>
        <div className="profile-page__reviews">
          {user && (<ReviewEditor
            errors={[]}
            loading={false}
            onChange={() => null}
            onRate={val => null}
            onSubmit={() => null}
            rating={0}
            review=""
            submit={false}
          />)}
        </div>
      </section>
    </div>
  );
};

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
