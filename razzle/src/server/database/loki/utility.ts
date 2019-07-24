import lokiDB, { Content, Episode, Review, User } from './db';

export const getContentCollection = () =>
  lokiDB.getCollection<Content>('content');

export const getEpisodeCollection = () =>
  lokiDB.getCollection<Episode>('episodes');

export const getReviewCollection = () =>
  lokiDB.getCollection<Review>('reviews');

export const getUserCollection = () => lokiDB.getCollection<User>('users');

export const getDbUser = (type: 'id' | 'email' | 'username', query: string) =>
  getUserCollection().findOne({
    [type]: { $eq: query }
  });
