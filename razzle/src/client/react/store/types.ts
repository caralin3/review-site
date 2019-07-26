import { UserState } from './user';

export interface AsyncState<T> {
  response?: T;
  loading: boolean;
  error?: Error;
}

export interface ApplicationState {
  User: UserState;
}
