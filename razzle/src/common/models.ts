export type UserRole = 'admin' | 'general';

export interface User {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
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
  id: string;
  rating: number;
  description: string;
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

export interface Movie {
  actors: string[];
  director: string;
  duration: number;
  id: string;
  image: string;
  genres: Genre[];
  mpa: MPA;
  rating: number;
  reviews: Review[];
  synopsis: string;
  title: string;
  year: number;
}

export interface Episode {
  id: string;
  date: string;
  duration: number;
  synopsis: string;
  title: string;
}

export interface Season {
  id: string;
  num: number;
  episodes: Episode[];
}

export interface Show {
  actors: string[];
  endYear: number;
  id: string;
  image: string;
  genres: Genre[];
  mpa: MPA;
  rating: number;
  reviews: Review[];
  seasons: Season[];
  startYear: number;
  synopsis: string;
  title: string;
}
