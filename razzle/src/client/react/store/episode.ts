import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import {
  Episode,
  NewEpisodeRequest,
  UpdateEpisodeRequest
} from '../../../common';
import * as api from '../../api';
import { ApplicationState, AsyncState } from './types';
import { getToken, rehydrateAction } from './utility';

const NAME = 'EPISODE';
const RESET = 'RESET';
const LOAD = 'LOAD';
const CREATE = 'CREATE';
const UPDATE = 'UPDATE';
const DELETE = 'DELETE';

export interface EpisodeState extends AsyncState<Episode> {}

const initialState: EpisodeState = {
  response: undefined,
  loading: false,
  error: undefined
};

const actionCreator = actionCreatorFactory(NAME);
const asyncActionCreator = asyncFactory<ApplicationState>(actionCreator);

export const resetAction = actionCreator(RESET);

export const reset = () => resetAction();

export const loadAction = asyncActionCreator<
  { contentId: string; id: string },
  Episode
>(
  LOAD,
  async (params, _, getState) =>
    (await api.fetchEpisode(params.contentId, params.id, getToken(getState())))
      .episode
);

export const load = (contentId: string, id: string) =>
  loadAction.action({ contentId, id });

export const createAction = asyncActionCreator<
  { contentId: string; body: NewEpisodeRequest },
  Episode
>(
  CREATE,
  async (params, _, getState) =>
    (await api.createEpisode(
      params.contentId,
      params.body,
      getToken(getState())
    )).episode
);

export const create = (contentId: string, body: NewEpisodeRequest) =>
  createAction.action({ contentId, body });

export const updateAction = asyncActionCreator<
  { contentId: string; id: string; body: UpdateEpisodeRequest },
  Episode
>(
  UPDATE,
  async (params, _, getState) =>
    (await api.updateEpisode(
      params.contentId,
      params.id,
      params.body,
      getToken(getState())
    )).episode
);

export const update = (
  contentId: string,
  id: string,
  body: UpdateEpisodeRequest
) => updateAction.action({ contentId, id, body });

export const deleteAction = asyncActionCreator<
  { contentId: string; id: string },
  string
>(
  DELETE,
  async (params, _, getState) =>
    (await api.deleteEpisode(params.contentId, params.id, getToken(getState())))
      .id
);

export const remove = (contentId: string, id: string) =>
  deleteAction.action({ contentId, id });

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
  }));
