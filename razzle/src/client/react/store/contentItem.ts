import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import {
  Content,
  NewContentRequest,
  UpdateContentRequest
} from '../../../common';
import * as api from '../../api';
import { ApplicationState, AsyncState } from './types';
import { getToken, rehydrateAction } from './utility';

const NAME = 'CONTENT_ITEM';
const RESET = 'RESET';
const LOAD = 'LOAD';
const CREATE = 'CREATE';
const UPDATE = 'UPDATE';
const DELETE = 'DELETE';
const ADD_RATING = 'ADD_RATING';
const UPDATE_RATING = 'UPDATE_RATING';
const WATCH = 'WATCH';
const UNWATCH = 'UNWATCH';

export interface ContentItemState extends AsyncState<Content> {}

const initialState: ContentItemState = {
  response: undefined,
  loading: false,
  error: undefined
};

const actionCreator = actionCreatorFactory(NAME);
const asyncActionCreator = asyncFactory<ApplicationState>(actionCreator);

export const resetAction = actionCreator(RESET);

export const reset = () => resetAction();

export const loadAction = asyncActionCreator<{ id: string }, Content>(
  LOAD,
  async (params, _, getState) =>
    (await api.fetchContentItem(params.id, getToken(getState()))).content
);

export const load = (id: string) => loadAction.action({ id });

export const createAction = asyncActionCreator<
  { body: NewContentRequest },
  Content
>(
  CREATE,
  async (params, _, getState) =>
    (await api.createContent(params.body, getToken(getState()))).content
);

export const create = (body: NewContentRequest) =>
  createAction.action({ body });

export const updateAction = asyncActionCreator<
  { id: string; body: UpdateContentRequest },
  Content
>(
  UPDATE,
  async (params, _, getState) =>
    (await api.updateContent(params.id, params.body, getToken(getState())))
      .content
);

export const update = (id: string, body: UpdateContentRequest) =>
  updateAction.action({ id, body });

export const deleteAction = asyncActionCreator<{ id: string }, string>(
  DELETE,
  async (params, _, getState) =>
    (await api.deleteContent(params.id, getToken(getState()))).id
);

export const remove = (id: string) => deleteAction.action({ id });

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
  .case(createAction.async.started, _ => ({
    response: undefined,
    loading: true,
    error: undefined
  }))
  .case(createAction.async.done, (_, { result: response }) => ({
    response,
    loading: false,
    error: undefined
  }))
  .case(createAction.async.failed, (_, { error }) => ({
    error,
    response: undefined,
    loading: false
  }))
  .case(updateAction.async.started, _ => ({
    response: undefined,
    loading: true,
    error: undefined
  }))
  .case(updateAction.async.done, (_, { result: response }) => ({
    response,
    loading: false,
    error: undefined
  }))
  .case(updateAction.async.failed, (_, { error }) => ({
    error,
    response: undefined,
    loading: false
  }))
  .case(deleteAction.async.started, state => ({
    response: state.response,
    loading: true,
    error: undefined
  }))
  .case(deleteAction.async.done, () => ({
    response: undefined,
    loading: false,
    error: undefined
  }))
  .case(deleteAction.async.failed, (state, { error }) => ({
    error,
    response: state.response,
    loading: false
  }))
  .case(addRatingAction.async.started, state => ({
    response: state.response,
    loading: false,
    error: undefined
  }))
  .case(addRatingAction.async.done, (_, { result: response }) => ({
    response,
    loading: false,
    error: undefined
  }))
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
  .case(updateRatingAction.async.done, (_, { result: response }) => ({
    response,
    loading: false,
    error: undefined
  }))
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
  .case(watchAction.async.done, (_, { result: response }) => ({
    response,
    loading: false,
    error: undefined
  }))
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
  .case(unwatchAction.async.done, (_, { result: response }) => ({
    response,
    loading: false,
    error: undefined
  }))
  .case(unwatchAction.async.failed, (state, { error }) => ({
    error,
    response: state.response,
    loading: false
  }));
