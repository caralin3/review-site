import actionCreatorFactory from 'typescript-fsa';
import { ApplicationState } from '.';

export const rehydrateAction = actionCreatorFactory()<ApplicationState>(
  'persist/REHYDRATE'
);

export function getToken(state: ApplicationState, optional?: boolean) {
  if (!state.User.response) {
    if (optional) {
      return '';
    }
    throw new Error('Not authenticated');
  }
  return state.User.response.token;
}
