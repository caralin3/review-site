import qs from 'querystring';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { User, ContentQuery, MultipleContentResponse } from '../../../common';
import {
  Banner,
  Container,
  SearchBar,
  Tab,
  TabList,
  TabPanel,
  ContentPreviewList
} from '../components';
import { routes } from '../routes';
import { ApplicationState } from '../store';
import * as contentState from '../store/content';

export interface HomePageProps extends RouteComponentProps {
  addRating: (id: string, rating: number) => void;
  content?: MultipleContentResponse;
  contentLoading: boolean;
  contentError?: Error;
  loadContent: (query?: ContentQuery) => void;
  updateRating: (id: string, rating: number) => void;
  unwatch: (id: string) => void;
  user?: User;
  watch: (id: string) => void;
}

export const DisconnectedHomePage: React.FC<HomePageProps> = ({
  addRating,
  content,
  contentLoading,
  contentError,
  history,
  location,
  loadContent,
  updateRating,
  unwatch,
  user,
  watch
}) => {
  const [tab, setTab] = React.useState<'movie' | 'show' | 'watch'>('movie');
  const [query, setQuery] = React.useState('');
  const watchTab = React.useRef(null);
  const movieTab = React.useRef(null);
  const showTab = React.useRef(null);

  React.useEffect(() => {
    if (user) {
      setTab('watch');
    }
    loadData();
  }, [location.pathname]);

  const loadData = async () => {
    await loadContent();
  };

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

  const handleRating = async (value: number, id: string, rated: boolean) => {
    if (user) {
      if (rated) {
        await updateRating(id, value);
      } else {
        await addRating(id, value);
      }
    }
  };

  const handleWatch = async (watching: boolean, id: string) => {
    if (user) {
      if (watching) {
        await unwatch(id);
      } else {
        await watch(id);
      }
    }
  };

  return (
    <div>
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
        {user && content && !contentLoading && (
          <TabPanel selected={tab} id="watch-list" tabId="watch">
            <ContentPreviewList
              contentList={content.allContent.filter(con => con.watchList)}
              handleRating={handleRating}
              handleWatch={handleWatch}
              user={user}
            />
          </TabPanel>
        )}
        {content && !contentLoading && (
          <TabPanel selected={tab} id="movie-panel" tabId="movie">
            <ContentPreviewList
              contentList={content.allContent.filter(
                con => con.type === 'Movie'
              )}
              handleRating={handleRating}
              handleWatch={handleWatch}
              user={user}
            />
          </TabPanel>
        )}
        {content && !contentLoading && (
          <TabPanel selected={tab} id="show-panel" tabId="show">
            <ContentPreviewList
              contentList={content.allContent.filter(
                con => con.type === 'Series'
              )}
              handleRating={handleRating}
              handleWatch={handleWatch}
              user={user}
            />
          </TabPanel>
        )}
      </Container>
    </div>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  content: state.Content.response,
  contentError: state.Content.error,
  contentLoading: state.Content.loading,
  user: state.User.response
});

const actionCreators = {
  loadContent: (query?: ContentQuery) => contentState.load(query),
  addRating: (id: string, rating: number) => contentState.addRating(id, rating),
  updateRating: (id: string, rating: number) =>
    contentState.updateRating(id, rating),
  watch: (id: string) => contentState.watch(id),
  unwatch: (id: string) => contentState.unwatch(id)
};

const mapActionsToProps = (dispatch: Dispatch) => ({
  ...bindActionCreators(actionCreators, dispatch)
});

export const HomePage = withRouter(
  connect(
    mapStateToProps,
    mapActionsToProps
  )(DisconnectedHomePage)
);
