import qs from 'querystring';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  Banner,
  Container,
  Layout,
  SearchBar,
  Tab,
  TabList,
  TabPanel,
  ContentPreview,
  ContentPreviewList
} from '../components';
import { admin1, content, user1 } from '../../mock';
import { routes } from '../routes';

export interface HomePageProps extends RouteComponentProps<{}> {}

export const DisconnectedHomePage: React.FC<HomePageProps> = ({ history }) => {
  const [tab, setTab] = React.useState<'movie' | 'show' | 'watch'>('movie');
  const [query, setQuery] = React.useState('');
  const watchTab = React.useRef(null);
  const movieTab = React.useRef(null);
  const showTab = React.useRef(null);

  const user = user1;
  const admin = admin1;

  React.useEffect(() => {
    if (user) {
      setTab('watch');
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.keyCode === 37) {
      // left arrow
      if (document.activeElement && document.activeElement.id === 'watch') {
        if (showTab && showTab.current) {
          (showTab.current as any).focus();
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
        if (movieTab && movieTab.current) {
          (movieTab.current as any).focus();
        }
      }
    } else if (e.keyCode === 39) {
      // right arrow
      if (document.activeElement && document.activeElement.id === 'watch') {
        if (movieTab && movieTab.current) {
          (movieTab.current as any).focus();
        }
      } else if (
        document.activeElement &&
        document.activeElement.id === 'movie'
      ) {
        if (showTab && showTab.current) {
          (showTab.current as any).focus();
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

  const handleSearch = () => {
    const queryString = qs.stringify({ query });
    history.push(`${routes.search.path}?${queryString}`);
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

  return (
    <Layout user={user}>
      <Banner>
        <i className="fas fa-film banner__icon" />
        <h1 className="banner__brand">reviewer</h1>
        <p className="banner__text">
          Review your favorite movies and tv shows. Start looking for movies and
          shows below.
        </p>
        <SearchBar
          onChange={e => setQuery(e.target.value)}
          onSearch={handleSearch}
          query={query}
        />
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
        </TabList>
        {user && (
          <TabPanel selected={tab} id="watch-list" tabId="watch">
            <ContentPreviewList
              contentList={content.content.filter(con => con.watchList)}
              handleRating={handleRating}
              handleWatch={handleWatch}
              user={user}
            />
          </TabPanel>
        )}
        <TabPanel selected={tab} id="movie-panel" tabId="movie">
          <ContentPreviewList
            contentList={content.content.filter(con => con.type === 'Movie')}
            handleRating={handleRating}
            handleWatch={handleWatch}
            user={user}
          />
        </TabPanel>
        <TabPanel selected={tab} id="show-panel" tabId="show">
          <ContentPreviewList
            contentList={content.content.filter(con => con.type === 'Series')}
            handleRating={handleRating}
            handleWatch={handleWatch}
            user={user}
          />
        </TabPanel>
      </Container>
    </Layout>
  );
};

export const HomePage = withRouter(DisconnectedHomePage);
