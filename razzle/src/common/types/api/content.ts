import { Content, ContentType, Genre, MPA } from '..';

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
