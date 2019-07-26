import qs from 'querystring';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { User } from '../../../common';
import { Banner, Container, SearchBar } from '../components';
import { ApplicationState } from '../store';
import { routes } from '../routes';

export interface SearchPageProps extends RouteComponentProps {
  user?: User;
}

export const DisconnectedSearchPage: React.FC<SearchPageProps> = ({
  history,
  location,
  user
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
    <div>
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
    </div>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  user: state.User.response
});

export const SearchPage = withRouter(
  connect(mapStateToProps)(DisconnectedSearchPage)
);
