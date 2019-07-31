import { ContentState } from './content';
import { ContentItemState } from './contentItem';
import { EpisodeState } from './episode';
import { EpisodesState } from './episodes';
import { ProfileState } from './profile';
import { ReviewsState } from './reviews';
import { UserState } from './user';

export interface AsyncState<T> {
  response?: T;
  loading: boolean;
  error?: Error;
}

export interface ApplicationState {
  Content: ContentState;
  ContentItem: ContentItemState;
  Episode: EpisodeState;
  Episodes: EpisodesState;
  Profile: ProfileState;
  Reviews: ReviewsState;
  User: UserState;
}
