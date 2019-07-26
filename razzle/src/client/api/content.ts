import axios, { AxiosResponse } from 'axios';
import {
  ContentQuery,
  MultipleEpisodesResponse,
  NewContentRequest,
  UpdateContentRequest,
  SingleEpisodeResponse
} from '../../common';
import { contentUrl, contentItemUrl, ratingUrl, watchlistUrl } from './routes';
import { getOptions } from '.';

/**
 * Get all content.
 * @param {ContentQuery} query Queries to filter content response.
 * @param {string} token Token of current user (Optional).
 */
export const fetchContent = async (query?: ContentQuery, token?: string) => {
  const request: AxiosResponse<MultipleEpisodesResponse> = await axios.get(
    contentUrl(query),
    getOptions(token)
  );
  return request.data;
};

/**
 * Get content item.
 * @param {string} id Content id.
 * @param {string} token Token of current user (Optional).
 */
export const fetchContentItem = async (id: string, token?: string) => {
  const request: AxiosResponse<SingleEpisodeResponse> = await axios.get(
    contentItemUrl(id),
    getOptions(token)
  );
  return request.data;
};

/**
 * Create content item.
 * @param {NewContentRequest} body Content to be added.
 * @param {string} token Token of current user.
 */
export const createContent = async (body: NewContentRequest, token: string) => {
  const request: AxiosResponse<SingleEpisodeResponse> = await axios.post(
    contentUrl(),
    body,
    getOptions(token)
  );
  return request.data;
};

/**
 * Update content item.
 * @param {string} id Content id.
 * @param {UpdateContentRequest} body Content to be updated.
 * @param {string} token Token of current user.
 */
export const updateContent = async (
  id: string,
  body: UpdateContentRequest,
  token: string
) => {
  const request: AxiosResponse<SingleEpisodeResponse> = await axios.put(
    contentItemUrl(id),
    body,
    getOptions(token)
  );
  return request.data;
};

/**
 * Delete content item.
 * @param {string} id Content id.
 * @param {string} token Token of current user.
 */
export const deleteContent = async (id: string, token: string) => {
  const request: AxiosResponse<SingleEpisodeResponse> = await axios.delete(
    contentItemUrl(id),
    getOptions(token)
  );
  return request.data;
};

/**
 * Add rating for content.
 * @param {string} id Content id.
 * @param {number} rating Content rating 1-5.
 * @param {string} token Token of current user.
 */
export const addRating = async (id: string, rating: number, token: string) => {
  const request: AxiosResponse<SingleEpisodeResponse> = await axios.post(
    ratingUrl(id),
    { rating },
    getOptions(token)
  );
  return request.data;
};

/**
 * Update rating for content.
 * @param {string} id Content id.
 * @param {number} rating Content rating 1-5.
 * @param {string} token Token of current user.
 */
export const updateRating = async (
  id: string,
  rating: number,
  token: string
) => {
  const request: AxiosResponse<SingleEpisodeResponse> = await axios.put(
    ratingUrl(id),
    { rating },
    getOptions(token)
  );
  return request.data;
};

/**
 * Add content item to watch list.
 * @param {string} id Content id.
 * @param {string} token Token of current user.
 */
export const watch = async (id: string, token: string) => {
  const request: AxiosResponse<SingleEpisodeResponse> = await axios.post(
    watchlistUrl(id),
    undefined,
    getOptions(token)
  );
  return request.data;
};

/**
 * Delete content item from watch list.
 * @param {string} id Content id.
 * @param {string} token Token of current user.
 */
export const unwatch = async (id: string, token: string) => {
  const request: AxiosResponse<SingleEpisodeResponse> = await axios.delete(
    watchlistUrl(id),
    getOptions(token)
  );
  return request.data;
};
