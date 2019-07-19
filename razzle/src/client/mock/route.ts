import { createMemoryHistory } from 'history';
import { RouteComponentProps } from 'react-router';

const history = createMemoryHistory();
export const routeProps = <T>(
  path = '/',
  params: T
): RouteComponentProps<T> => ({
  history,
  match: {
    path,
    params,
    isExact: true,
    url: ''
  },
  location: {
    pathname: path,
    search: '',
    state: null,
    hash: ''
  }
});
