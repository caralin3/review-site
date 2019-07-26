import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import {
  Content,
  ContentQuery,
  MultipleContentResponse
} from '../../../common';
import * as api from '../../api';
import { ApplicationState, AsyncState } from './types';
import { getToken, rehydrateAction } from './utility';

const NAME = 'CONTENT';
const RESET = 'RESET';
const LOAD = 'LOAD';
const ADD_RATING = 'ADD_RATING';
const UPDATE_RATING = 'UPDATE_RATING';
const WATCH = 'WATCH';
const UNWATCH = 'UNWATCH';

export interface ContentState extends AsyncState<MultipleContentResponse> {}

const initialState: ContentState = {
  response: undefined,
  loading: false,
  error: undefined
};

const actionCreator = actionCreatorFactory(NAME);
const asyncActionCreator = asyncFactory<ApplicationState>(actionCreator);

export const resetAction = actionCreator(RESET);

export const reset = () => resetAction();

export const loadAction = asyncActionCreator<
  { query?: ContentQuery },
  MultipleContentResponse
>(
  LOAD,
  async (params, _, getState) =>
    await api.fetchContent(params.query, getToken(getState(), true))
);

export const load = (query?: ContentQuery) => loadAction.action({ query });

export const addRatingAction = asyncActionCreator<
  { id: string; rating: number },
  Content
>(
  ADD_RATING,
  async (params, _, getState) =>
    (await api.addRating(params.id, params.rating, getToken(getState())))
      .content
);

export const addRating = (id: string, rating: number) =>
  addRatingAction.action({ id, rating });

export const updateRatingAction = asyncActionCreator<
  { id: string; rating: number },
  Content
>(
  UPDATE_RATING,
  async (params, _, getState) =>
    (await api.updateRating(params.id, params.rating, getToken(getState())))
      .content
);

export const updateRating = (id: string, rating: number) =>
  updateRatingAction.action({ id, rating });

export const watchAction = asyncActionCreator<{ id: string }, Content>(
  WATCH,
  async (params, _, getState) =>
    (await api.watch(params.id, getToken(getState()))).content
);

export const watch = (id: string) => watchAction.action({ id });

export const unwatchAction = asyncActionCreator<{ id: string }, Content>(
  UNWATCH,
  async (params, _, getState) =>
    (await api.unwatch(params.id, getToken(getState()))).content
);

export const unwatch = (id: string) => unwatchAction.action({ id });

const setRating = (state: ContentState, payload: Content) => {
  if (state.response) {
    return {
      ...state,
      response: {
        ...state.response,
        allContent: state.response.allContent.map(content => {
          if (content.id === payload.id) {
            return {
              ...content,
              myRating: payload.myRating
            };
          }
          return content;
        })
      }
    };
  }
  return state;
};

const setWatch = (state: ContentState, payload: Content) => {
  if (state.response) {
    return {
      ...state,
      response: {
        ...state.response,
        allContent: state.response.allContent.map(content => {
          if (content.id === payload.id) {
            return {
              ...content,
              watchList: payload.watchList
            };
          }
          return content;
        })
      }
    };
  }
  return state;
};

export const reducer = reducerWithInitialState(initialState)
  .case(rehydrateAction, state => state)
  .case(resetAction, _ => ({ ...initialState }))
  .case(loadAction.async.started, state => ({
    response: state.response,
    loading: true,
    error: undefined
  }))
  .case(loadAction.async.done, (_, { result: response }) => ({
    response,
    loading: false,
    error: undefined
  }))
  .case(loadAction.async.failed, (state, { error }) => ({
    error,
    response: state.response,
    loading: false
  }))
  .case(addRatingAction.async.started, state => ({
    response: state.response,
    loading: false,
    error: undefined
  }))
  .case(addRatingAction.async.done, (state, { result: response }) =>
    setRating(state, response)
  )
  .case(addRatingAction.async.failed, (state, { error }) => ({
    error,
    response: state.response,
    loading: false
  }))
  .case(updateRatingAction.async.started, state => ({
    response: state.response,
    loading: false,
    error: undefined
  }))
  .case(updateRatingAction.async.done, (state, { result: response }) =>
    setRating(state, response)
  )
  .case(updateRatingAction.async.failed, (state, { error }) => ({
    error,
    response: state.response,
    loading: false
  }))
  .case(watchAction.async.started, state => ({
    response: state.response,
    loading: false,
    error: undefined
  }))
  .case(watchAction.async.done, (state, { result: response }) =>
    setWatch(state, response)
  )
  .case(watchAction.async.failed, (state, { error }) => ({
    error,
    response: state.response,
    loading: false
  }))
  .case(unwatchAction.async.started, state => ({
    response: state.response,
    loading: false,
    error: undefined
  }))
  .case(unwatchAction.async.done, (state, { result: response }) =>
    setWatch(state, response)
  )
  .case(unwatchAction.async.failed, (state, { error }) => ({
    error,
    response: state.response,
    loading: false
  }));
