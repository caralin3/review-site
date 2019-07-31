import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import { Profile } from '../../../common';
import * as api from '../../api';
import { ApplicationState, AsyncState } from './types';
import { getToken, rehydrateAction } from './utility';

const NAME = 'PROFILE';
const RESET = 'RESET';
const LOAD = 'LOAD';

export interface ProfileState extends AsyncState<Profile> {}

const initialState: ProfileState = {
  response: undefined,
  loading: false,
  error: undefined
};

const actionCreator = actionCreatorFactory(NAME);
const asyncActionCreator = asyncFactory<ApplicationState>(actionCreator);

export const resetAction = actionCreator(RESET);

export const reset = () => resetAction();

export const loadAction = asyncActionCreator<{ username: string }, Profile>(
  LOAD,
  async (params, _, getState) =>
    (await api.fetchProfile(params.username, getToken(getState(), true)))
      .profile
);

export const load = (username: string) => loadAction.action({ username });

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
