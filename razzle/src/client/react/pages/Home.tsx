import React from 'react';
import {
  Banner,
  Container,
  Layout,
  SearchBar,
  Tab,
  TabList,
  TabPanel
} from '../components';
import { user1, admin1 } from '../../mock';

export interface HomeProps {}

export const DisconnectedHome: React.FC<HomeProps> = () => {
  const [tab, setTab] = React.useState<'movie' | 'show' | 'watch'>('movie');
  const [query, setQuery] = React.useState('');

  const handleSearch = async () => {
    console.log('Search with ', query);
  };

  const user = user1;
  const admin = admin1;

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
      {/* @TODO: Watch list reviews when logged in */}
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
            <p>Watch List</p>
          </TabPanel>
        )}
        <TabPanel selected={tab} id="movie-panel" tabId="movie">
          <p>Movies</p>
        </TabPanel>
        <TabPanel selected={tab} id="show-panel" tabId="show">
          <p>TV Shows</p>
        </TabPanel>
      </Container>
    </Layout>
  );
};

export const Home = DisconnectedHome;
