import qs from 'querystring';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Banner, Container, Layout, SearchBar } from '../components';
import { routes } from '../routes';

export interface SearchPageProps extends RouteComponentProps<{}> {}

export const DisconnectedSearchPage: React.FC<SearchPageProps> = ({
  history,
  location
}) => {
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    const search = qs.parse(location.search.slice(1));
    setQuery(search.query as string);
  }, [location.search]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    history.push(`${routes.search.path}?${query}`);
  };

  return (
    <Layout>
      <Banner>
        <SearchBar
          onChange={handleChange}
          onSearch={handleSearch}
          query={query}
        />
      </Banner>
      <Container>
        <h2>
          Search results for: &nbsp;<span>{query}</span>
        </h2>
      </Container>
    </Layout>
  );
};

export const SearchPage = withRouter(DisconnectedSearchPage);
