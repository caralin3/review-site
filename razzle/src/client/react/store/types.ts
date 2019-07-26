import { ContentState } from './content';
import { ContentItemState } from './contentItem';
import { EpisodeState } from './episode';
import { EpisodesState } from './episodes';
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
  Reviews: ReviewsState;
  User: UserState;
}
