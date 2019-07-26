import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import {
  Content,
  ContentType,
  ContentQuery,
  MultipleContentResponse,
  MultipleEpisodesResponse,
  User,
  EpisodesQuery,
  MultipleReviewsResponse
} from '../../../common';
import { Container, ContentItem, ContentList } from '../components';
import { ApplicationState } from '../store';
import * as contentState from '../store/content';
import * as contentItemState from '../store/contentItem';
import * as episodesState from '../store/episodes';
import * as reviewsState from '../store/reviews';

export interface ContentPageProps extends RouteComponentProps<{ id?: string }> {
  addRating: (id: string, rating: number) => void;
  content?: Content;
  contentError?: Error;
  contentLoading: boolean;
  contentList?: MultipleContentResponse;
  contentListError?: Error;
  contentListLoading: boolean;
  episodes?: MultipleEpisodesResponse;
  loadContentList: (query?: ContentQuery) => void;
  loadContent: (id: string) => void;
  loadReviews: (contentId: string) => void;
  loadEpisodes: (contentId: string, query: EpisodesQuery) => void;
  reviews?: MultipleReviewsResponse;
  updateRating: (id: string, rating: number) => void;
  unwatch: (id: string) => void;
  user?: User;
  watch: (id: string) => void;
}

export const DisconnectedContentPage: React.FC<ContentPageProps> = ({
  addRating,
  content,
  contentError,
  contentLoading,
  contentList,
  contentListError,
  contentListLoading,
  episodes,
  loadContentList,
  loadContent,
  loadEpisodes,
  loadReviews,
  location,
  match: { params },
  reviews,
  updateRating,
  unwatch,
  user,
  watch
}) => {
  const [season, setSeason] = React.useState(1);
  const [type, setType] = React.useState<ContentType>('Movie');

  React.useEffect(() => {
    if (params && params.id) {
      loadData(params.id);
    }
    if (location.pathname.includes('movies')) {
      setType('Movie');
    } else if (location.pathname.includes('shows')) {
      setType('Series');
    }
  }, [location.pathname, params.id, type]);

  const loadData = async (id: string) => {
    await loadContent(id);
    await loadReviews(id);
    if (type === 'Series') {
      await loadEpisodes(id, { season });
    }
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

  const handleDeleteReview = (id: string) => {
    if (user) {
      console.log('Delete ', id);
    }
  };

  return (
    <div>
      {params.id ? (
        <Container>
          {content && !contentLoading && (
            <ContentItem
              content={content}
              episodes={content.type === 'Series' ? episodes : undefined}
              handleDeleteReview={handleDeleteReview}
              handleRating={handleRating}
              handleWatch={handleWatch}
              reviews={reviews}
              user={user}
            />
          )}
        </Container>
      ) : (
        contentList &&
        !contentListLoading && (
          <ContentList
            content={contentList}
            handleRating={handleRating}
            handleWatch={handleWatch}
            type={type}
            user={user}
          />
        )
      )}
    </div>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  contentList: state.Content.response,
  contentListError: state.Content.error,
  contentListLoading: state.Content.loading,
  content: state.ContentItem.response,
  contentError: state.ContentItem.error,
  contentLoading: state.ContentItem.loading,
  episodes: state.Episodes.response,
  reviews: state.Reviews.response,
  user: state.User.response
});

const actionCreators = {
  loadContentList: (query?: ContentQuery) => contentState.load(query),
  loadContent: (id: string) => contentItemState.load(id),
  loadEpisodes: (contentId: string, query: EpisodesQuery) =>
    episodesState.load(contentId, query),
  loadReviews: (contentId: string) => reviewsState.load(contentId),
  addRating: (id: string, rating: number) =>
    contentItemState.addRating(id, rating),
  updateRating: (id: string, rating: number) =>
    contentItemState.updateRating(id, rating),
  watch: (id: string) => contentItemState.watch(id),
  unwatch: (id: string) => contentItemState.unwatch(id)
};

const mapActionsToProps = (dispatch: Dispatch) => ({
  ...bindActionCreators(actionCreators, dispatch)
});

export const ContentPage = withRouter(
  connect(
    mapStateToProps,
    mapActionsToProps
  )(DisconnectedContentPage)
);
