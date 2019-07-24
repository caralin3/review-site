export type UserRole = 'admin' | 'general';

export interface User {
  email: string;
  bio: string;
  image: string;
  token: string;
  role: UserRole;
  username: string;
}

export interface Author {
  bio: string;
  email: string;
  image: string;
  username: string;
}

export interface Review {
  author: Author;
  body: string; // @TODO: rich text field
  created: string;
  id: string;
  rating: number;
}

export type MPA = 'G' | 'PG' | 'PG-13' | 'TV-14' | 'TV-MA' | 'R';

export type Genre =
  | 'Action'
  | 'Comedy'
  | 'Drama'
  | 'Family'
  | 'Horror'
  | 'Musical'
  | 'Romance'
  | 'Thriller';

export type ContentType = 'Movie' | 'Series';

export interface Episode {
  date: string;
  duration: number;
  id: string;
  num: number;
  season: number;
  synopsis: string;
  title: string;
}

export interface Content {
  actors: string[];
  director: string;
  duration: number;
  endYear?: number;
  id: string;
  image: string;
  genres: Genre[];
  mpa: MPA;
  myRating?: number;
  network?: string;
  rating: number;
  synopsis: string; // @TODO: rich text field
  title: string;
  watchList: boolean;
  year: number;
  type: ContentType;
}
