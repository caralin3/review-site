import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import * as api from '../../api';
import {
  MultipleReviewsResponse,
  NewReviewRequest,
  Review
} from '../../../common';
import { ApplicationState, AsyncState } from './types';
import { rehydrateAction, getToken } from './utility';

const NAME = 'COMMENTS';
const RESET = 'RESET';
const LOAD = 'LOAD';
const CREATE = 'CREATE';
const UPDATE = 'UPDATE';
const DELETE = 'DELETE';

export interface ReviewsState extends AsyncState<MultipleReviewsResponse> {}

const initialState: ReviewsState = {
  response: undefined,
  loading: false,
  error: undefined
};

const actionCreator = actionCreatorFactory(NAME);
const asyncActionCreator = asyncFactory<ApplicationState>(actionCreator);

export const resetAction = actionCreator(RESET);

export const reset = () => resetAction();

export const loadAction = asyncActionCreator<
  {
    contentId: string;
  },
  MultipleReviewsResponse
>(
  LOAD,
  async (params, _, getState) =>
    await api.fetchReviews(params.contentId, getToken(getState(), true))
);

export const load = (contentId: string) => loadAction.action({ contentId });

export const createAction = asyncActionCreator<
  {
    contentId: string;
    body: NewReviewRequest;
  },
  Review
>(
  CREATE,
  async (params, _, getState) =>
    (await api.createReview(
      params.contentId,
      params.body,
      getToken(getState())
    )).review
);

export const create = (contentId: string, body: NewReviewRequest) =>
  createAction.action({ contentId, body });

export const updateAction = asyncActionCreator<
  {
    contentId: string;
    id: string;
    body: NewReviewRequest;
  },
  Review
>(
  UPDATE,
  async (params, _, getState) =>
    (await api.updateReview(
      params.contentId,
      params.id,
      params.body,
      getToken(getState())
    )).review
);

export const update = (contentId: string, id: string, body: NewReviewRequest) =>
  updateAction.action({ contentId, id, body });

export const deleteAction = asyncActionCreator<
  {
    contentId: string;
    id: string;
  },
  string
>(DELETE, async (params, _, getState) => {
  await api.deleteReview(params.contentId, params.id, getToken(getState()));
  return params.id;
});

export const remove = (contentId: string, id: string) =>
  deleteAction.action({ contentId, id });

const updateReview = (state: ReviewsState, review: Review) => {
  if (state.response) {
    state.response.reviews.map(rev => {
      if (rev.id === review.id) {
        return review;
      }
      return rev;
    });
  }
  return undefined;
};

export const reducer = reducerWithInitialState(initialState)
  .case(rehydrateAction, state => state)
  .case(resetAction, _ => ({ ...initialState }))
  .case(loadAction.async.started, _ => ({
    response: undefined,
    loading: true,
    error: undefined
  }))
  .case(loadAction.async.done, (_, { result: response }) => ({
    response,
    loading: false,
    error: undefined
  }))
  .case(loadAction.async.failed, (_, { error }) => ({
    error,
    response: undefined,
    loading: false
  }))
  .case(createAction.async.started, state => ({
    response: state.response,
    loading: true,
    error: undefined
  }))
  .case(createAction.async.done, (state, { result: review }) => ({
    response: state.response
      ? {
          reviews: [review, ...state.response.reviews],
          count: state.response.count + 1
        }
      : undefined,
    loading: false,
    error: undefined
  }))
  .case(createAction.async.failed, (state, { error }) => ({
    error,
    response: state.response,
    loading: false
  }))
  .case(updateAction.async.started, state => ({
    response: state.response,
    loading: true,
    error: undefined
  }))
  .case(updateAction.async.done, (state, { result: review }) => ({
    response: updateReview(state, review),
    loading: false,
    error: undefined
  }))
  .case(updateAction.async.failed, (state, { error }) => ({
    error,
    response: state.response,
    loading: false
  }))
  .case(deleteAction.async.started, state => ({
    response: state.response,
    loading: true,
    error: undefined
  }))
  .case(deleteAction.async.done, (state, { result: id }) => ({
    response: state.response
      ? {
          reviews: state.response.reviews.filter(review => review.id !== id),
          count: state.response.count - 1
        }
      : undefined,
    loading: false,
    error: undefined
  }))
  .case(deleteAction.async.failed, (state, { error }) => ({
    error,
    response: state.response,
    loading: false
  }));
