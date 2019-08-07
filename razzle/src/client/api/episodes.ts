import axios, { AxiosResponse } from 'axios';
import {
  EpisodesQuery,
  NewEpisodeRequest,
  UpdateEpisodeRequest,
  MultipleEpisodesResponse,
  SingleEpisodeResponse
} from '../../common';
import { episodeUrl, episodesUrl } from './routes';
import { getOptions } from '.';

/**
 * Get all episodes for a content item.
 * @param {string} contentId Id of content associated with episode.
 * @param {string} token Token of current user (Optional).
 */
export const fetchEpisodes = async (
  contentId: string,
  query?: EpisodesQuery,
  token?: string
) => {
  const request: AxiosResponse<MultipleEpisodesResponse> = await axios.get(
    episodesUrl(contentId, query),
    getOptions(token)
  );
  return request.data;
};

/**
 * Get an episode.
 * @param {string} contentId Id of content associated with episode.
 * @param {string} id Id of the episode to be fetched.
 * @param {string} token Token of current user (Optional).
 */
export const fetchEpisode = async (
  contentId: string,
  id: string,
  token?: string
) => {
  const request: AxiosResponse<SingleEpisodeResponse> = await axios.get(
    episodeUrl(contentId, id),
    getOptions(token)
  );
  return request.data;
};

/**
 * Create an episode.
 * @param {string} contentId Id of content associated with episode.
 * @param {NewEpisodeRequest} body Episode to be added.
 * @param {string} token Token of current user.
 */
export const createEpisode = async (
  contentId: string,
  body: NewEpisodeRequest,
  token: string
) => {
  const request: AxiosResponse<SingleEpisodeResponse> = await axios.post(
    episodesUrl(contentId),
    body,
    getOptions(token)
  );
  return request.data;
};

/**
 * Update an episode.
 * @param {string} contentId Id of content associated with episode.
 * @param {string} id Id of the episode to be updated.
 * @param {UpdateEpisodeRequest} body Updated content of the episode.
 * @param {string} token Token of current user.
 */
export const updateEpisode = async (
  contentId: string,
  id: string,
  body: UpdateEpisodeRequest,
  token: string
) => {
  const request: AxiosResponse<SingleEpisodeResponse> = await axios.put(
    episodeUrl(contentId, id),
    body,
    getOptions(token)
  );
  return request.data;
};

/**
 * Delete an episode.
 * @param {string} contentId Id of content associated with episode.
 * @param {string} id Id of the episode to be updated.
 * @param token Token of current user.
 */
export const deleteEpisode = async (
  contentId: string,
  id: string,
  token: string
) => {
  const request: AxiosResponse<{ id: string }> = await axios.delete(
    episodeUrl(contentId, id),
    getOptions(token)
  );
  return request.data;
};
