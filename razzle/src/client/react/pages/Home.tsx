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
import { user1, admin1 } from '../../mock';
import { content } from '../../mock/content';
import { Link } from 'react-router-dom';
import { routes } from '../routes';

export interface HomeProps {}

export const DisconnectedHome: React.FC<HomeProps> = () => {
  const [tab, setTab] = React.useState<'movie' | 'show' | 'watch'>('movie');
  const [query, setQuery] = React.useState('');

  const user = user1;
  const admin = admin1;

  React.useEffect(() => {
    if (user) {
      setTab('watch');
    }
  }, []);

  const handleSearch = async () => {
    console.log('Search with ', query);
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
              panelId="watch-list"
              selected={tab}
              onClick={() => setTab('watch')}
            >
              Watch List
            </Tab>
          )}
          <Tab
            id="movie"
            panelId="movie-panel"
            selected={tab}
            onClick={() => setTab('movie')}
          >
            Movies
          </Tab>
          <Tab
            id="show"
            panelId="show-panel"
            selected={tab}
            onClick={() => setTab('show')}
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
                    <Link
                      to={
                        content.type === 'Movie'
                          ? `${routes.movie.path}/${content.id}`
                          : `${routes.show.path}/${content.id}`
                      }
                    >
                      <ContentPreview
                        {...content}
                        onRate={() => null}
                        onWatch={() => null}
                        type="Movie"
                      />
                    </Link>
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
                  <Link to={`${routes.movie.path}/${movie.id}`}>
                    <ContentPreview
                      {...movie}
                      onRate={() => null}
                      onWatch={() => null}
                    />
                  </Link>
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
                  <Link to={`${routes.show.path}/${show.id}`}>
                    <ContentPreview
                      {...show}
                      onRate={() => null}
                      onWatch={() => null}
                      year={`${show.year}-${show.endYear ? show.endYear : ''}`}
                    />
                  </Link>
                </li>
              ))}
          </ul>
        </TabPanel>
      </Container>
    </Layout>
  );
};

export const Home = DisconnectedHome;
