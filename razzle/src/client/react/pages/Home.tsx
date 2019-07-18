import React from 'react';
import { Banner, Layout, SearchBar } from '../components';

export interface HomeProps {}

export const DisconnectedHome: React.FC<HomeProps> = () => {
  const [query, setQuery] = React.useState('');

  const handleSearch = async () => {
    console.log('Search with ', query);
  };

  return (
    <Layout>
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
    </Layout>
  );
};

export const Home = DisconnectedHome;
