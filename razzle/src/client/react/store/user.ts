import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { asyncFactory } from 'typescript-fsa-redux-thunk';
import {
  User,
  LoginUserRequest,
  RegisterUserRequest,
  UpdateUserRequest
} from '../../../common';
import * as auth from '../../api';
import { ApplicationState, AsyncState } from './types';
import { getToken, rehydrateAction } from './utility';

const NAME = 'USER';
const RESET = 'RESET';
const LOAD = 'LOAD';
const REGISTER = 'REGISTER';
const LOGIN = 'LOGIN';
const UPDATE = 'UPDATE';

export interface UserState extends AsyncState<User> {}

const initialState: UserState = {
  response: undefined,
  loading: false,
  error: undefined
};

const actionCreator = actionCreatorFactory(NAME);
const asyncActionCreator = asyncFactory<ApplicationState>(actionCreator);

export const resetAction = actionCreator(RESET);

export const reset = () => resetAction();

export const loadAction = asyncActionCreator<{}, User>(
  LOAD,
  async (_p, _, getState) =>
    (await auth.fetchCurrentUser(getToken(getState()))).user
);

export const load = () => loadAction.action();

export const registerAction = asyncActionCreator<
  { user: RegisterUserRequest },
  User
>(REGISTER, async params => (await auth.register(params.user)).user);

export const register = (user: RegisterUserRequest) =>
  registerAction.action({ user });

export const loginAction = asyncActionCreator<{ user: LoginUserRequest }, User>(
  LOGIN,
  async params => (await auth.login(params.user)).user
);

export const login = (user: LoginUserRequest) => loginAction.action({ user });

export const updateAction = asyncActionCreator<
  { body: UpdateUserRequest },
  User
>(
  UPDATE,
  async (params, _, getState) =>
    (await auth.updateUser(params.body, getToken(getState()))).user
);

export const update = (body: UpdateUserRequest) =>
  updateAction.action({ body });

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
  .case(registerAction.async.started, _ => ({
    response: undefined,
    loading: true,
    error: undefined
  }))
  .case(registerAction.async.done, (_, { result: response }) => ({
    response,
    loading: false,
    error: undefined
  }))
  .case(registerAction.async.failed, (_, { error }) => ({
    error,
    response: undefined,
    loading: false
  }))
  .case(loginAction.async.started, _ => ({
    response: undefined,
    loading: true,
    error: undefined
  }))
  .case(loginAction.async.done, (_, { result: response }) => ({
    response,
    loading: false,
    error: undefined
  }))
  .case(loginAction.async.failed, (_, { error }) => ({
    error,
    response: undefined,
    loading: false
  }))
  .case(updateAction.async.started, state => ({
    response: state.response,
    loading: true,
    error: undefined
  }))
  .case(updateAction.async.done, (_, { result: response }) => ({
    response,
    loading: false,
    error: undefined
  }))
  .case(updateAction.async.failed, (state, { error }) => ({
    error,
    response: state.response,
    loading: false
  }));
