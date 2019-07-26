import qs, { ParsedUrlQueryInput } from 'querystring';
import { ContentQuery, EpisodesQuery } from '../../common';

export const baseUrl = '/api/v1';

const createQuery = (
  query: ContentQuery | EpisodesQuery,
  initial: ParsedUrlQueryInput = {}
) => {
  let input: ParsedUrlQueryInput = initial;
  Object.keys(query).forEach(key => {
    const val = query[key];
    if (val) {
      input = { ...input, [key]: val };
    }
  });
  const q = qs.stringify(input);
  return q;
};

export const loginUrl = `${baseUrl}/users/login`;

export const profileUrl = (username: string) =>
  `${baseUrl}/profile/${username}`;

export const registrationUrl = `${baseUrl}/users`;

export const userUrl = `${baseUrl}/user`;

export const contentUrl = (query?: ContentQuery) => {
  if (query) {
    const q = createQuery(query);
    return `${baseUrl}/content?${q}`;
  }
  return `${baseUrl}/content`;
};

export const contentItemUrl = (id: string) => `${baseUrl}/content/${id}`;

export const episodesUrl = (id: string, query?: EpisodesQuery) => {
  if (query) {
    const input: ParsedUrlQueryInput = { season: query.season };
    const q = createQuery(query, input);
    return `${baseUrl}/content/${id}/episodes?${q}`;
  }
  return `${baseUrl}/content/${id}/episodes`;
};

export const episodeUrl = (id: string, episodeId: string) =>
  `${baseUrl}/content/${id}/episodes/${episodeId}`;

export const reviewsUrl = (id: string) => `${baseUrl}/content/${id}/reviews`;

export const reviewUrl = (id: string, reviewId: string) =>
  `${baseUrl}/content/${id}/reviews/${reviewId}`;

export const ratingUrl = (id: string) => `${baseUrl}/content/${id}/rating`;

export const watchlistUrl = (id: string) =>
  `${baseUrl}/content/${id}/watchlist`;
