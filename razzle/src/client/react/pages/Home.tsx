import React from 'react';
import {
  Banner,
  Container,
  Layout,
  SearchBar,
  Tab,
  TabList,
  TabPanel,
  ContentPreview
} from '../components';
import { admin1, content, user1 } from '../../mock';

export interface HomeProps {}

export const DisconnectedHome: React.FC<HomeProps> = () => {
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
    console.log('Search with ', query);
  };

  const handleRating = (value: number, id: string) => {
    console.log('Rating ', value, id);
  };

  const handleWatch = (watching: boolean) => {
    console.log('Watching ', watching);
  };

  return (
    <Layout user={user}>
      <Banner>
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
            <ul className="home__preview-list">
              {content.content
                .filter(con => con.watchList)
                .map(content => (
                  <li className="home__preview-item" key={content.id}>
                    <ContentPreview
                      content={content}
                      onRate={val => handleRating(val, content.id)}
                      onWatch={() => handleWatch(content.watchList)}
                    />
                  </li>
                ))}
            </ul>
          </TabPanel>
        )}
        <TabPanel selected={tab} id="movie-panel" tabId="movie">
          <ul className="home__preview-list">
            {content.content
              .filter(con => con.type === 'Movie')
              .map(movie => (
                <li className="home__preview-item" key={movie.id}>
                  <ContentPreview
                    content={movie}
                    onRate={val => handleRating(val, movie.id)}
                    onWatch={() => handleWatch(movie.watchList)}
                  />
                </li>
              ))}
          </ul>
        </TabPanel>
        <TabPanel selected={tab} id="show-panel" tabId="show">
          <ul className="home__preview-list">
            {content.content
              .filter(con => con.type === 'Series')
              .map(show => (
                <li className="home__preview-item" key={show.id}>
                  <ContentPreview
                    content={show}
                    onRate={val => handleRating(val, show.id)}
                    onWatch={() => handleWatch(show.watchList)}
                  />
                </li>
              ))}
          </ul>
        </TabPanel>
      </Container>
    </Layout>
  );
};

export const Home = DisconnectedHome;
