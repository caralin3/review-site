import { Content, ContentType, Genre, MPA } from '..';

export interface ContentQuery {
  actor?: string;
  director?: string;
  genres?: string;
  limit?: number;
  mpa?: MPA;
  myRating?: number;
  network?: string;
  offset?: number;
  rating?: number;
  title?: string;
  type?: ContentType;
  watchList?: string;
  year?: number;
}

export interface SingleContentResponse {
  content: Content;
}

export interface MultipleContentResponse {
  allContent: Content[];
  count: number;
}

// Returns SingleContentResponse
export interface NewContent {
  actors: string[];
  director: string;
  duration: number;
  endYear?: number;
  image: string;
  genres: Genre[];
  mpa: MPA;
  network?: string;
  synopsis: string;
  title: string;
  year: number;
  type: ContentType;
}

export interface NewContentRequest {
  content: NewContent;
}

export interface UpdateContent {
  actors?: string[];
  director?: string;
  duration?: number;
  endYear?: number;
  image?: string;
  genres?: Genre[];
  mpa?: MPA;
  network?: string;
  synopsis?: string;
  title?: string;
  year?: number;
  type?: ContentType;
}

// Returns SingleContentResponse
export interface UpdateContentRequest {
  content: UpdateContent;
}
