import { Episode } from '..';

export interface EpisodesQuery {
  season: number;
  num?: number;
  year?: number;
}

export interface SingleEpisodeResponse {
  episode: Episode;
}

export interface MultipleEpisodesResponse {
  episodes: Episode[];
  count: number;
}

// Returns SingleEpisodeResponse
export interface NewEpisode {
  date: string;
  duration: number;
  num: number;
  season: number;
  synopsis: string;
  title: string;
}

export interface NewEpisodeRequest {
  episode: NewEpisode;
}

export interface UpdateEpisode {
  date?: string;
  duration?: number;
  num?: number;
  season?: number;
  synopsis?: string;
  title?: string;
}

// Returns SingleEpisodeResponse
export interface UpdateEpisodeRequest {
  episode: UpdateEpisode;
}
