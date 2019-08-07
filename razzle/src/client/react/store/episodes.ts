import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import { EpisodesQuery, MultipleEpisodesResponse } from '../../../common';
import * as api from '../../api';
import { ApplicationState, AsyncState } from './types';
import { getToken, rehydrateAction } from './utility';

const NAME = 'EPISODES';
const RESET = 'RESET';
const LOAD = 'LOAD';

export interface EpisodesState extends AsyncState<MultipleEpisodesResponse> {}

const initialState: EpisodesState = {
  response: undefined,
  loading: false,
  error: undefined
};

const actionCreator = actionCreatorFactory(NAME);
const asyncActionCreator = asyncFactory<ApplicationState>(actionCreator);

export const resetAction = actionCreator(RESET);

export const reset = () => resetAction();

export const loadAction = asyncActionCreator<
  { contentId: string; query: EpisodesQuery | undefined },
  MultipleEpisodesResponse
>(
  LOAD,
  async (params, _, getState) =>
    await api.fetchEpisodes(
      params.contentId,
      params.query,
      getToken(getState())
    )
);

export const load = (contentId: string, query?: EpisodesQuery) =>
  loadAction.action({ contentId, query });

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
  }));
