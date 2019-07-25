import {
  Content,
  ContentType,
  Genre,
  MPA,
  Profile,
  User,
  UserRole
} from '../common';
import {
  Content as DbContent,
  User as DbUser,
  getUserCollection
} from './database';

export const formatUser = (user: DbUser, token: string): User => ({
  token,
  bio: user.bio,
  email: user.email,
  image: user.image,
  role: user.role as UserRole,
  username: user.username
});

export const formatProfile = (user: DbUser): Profile => ({
  bio: user.bio,
  email: user.email,
  image: user.image,
  username: user.username
});

export const formatContent = (
  content: DbContent,
  rating: number,
  watchList: boolean,
  myRating?: number
): Content => ({
  ...content,
  myRating,
  rating,
  watchList,
  endYear: content.endYear > 0 ? content.endYear : undefined,
  genres: content.genres as Genre[],
  mpa: content.mpa as MPA,
  network: content.network ? content.network : undefined,
  type: content.type as ContentType
});

export const calcMyRating = (currentUser: DbUser, content: DbContent) => {
  const [rating] = currentUser.ratings
    .filter(r => r.contentId === content.id)
    .map(r => r.rating);
  if (!rating) {
    return undefined;
  }
  return rating;
};

export const calcAvgRating = (content: DbContent) => {
  const usersColl = getUserCollection();
  const ratings: { rating: number; contentId: string }[] = [];
  usersColl.find().forEach(user => {
    ratings.push(...user.ratings);
  });
  const mappedRatings = ratings
    .filter(r => r.contentId === content.id)
    .map(r => r.rating);
  if (mappedRatings.length > 0) {
    const avg = mappedRatings.reduce(
      (acc, curr, index, arr) => (acc + curr) / arr.length
    );
    return Math.floor(avg);
  }
  return 0;
};
