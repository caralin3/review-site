import axios, { AxiosResponse } from 'axios';
import {
  NewReviewRequest,
  UpdateReviewRequest,
  MultipleReviewsResponse,
  SingleReviewResponse
} from '../../common';
import { reviewsUrl, reviewUrl } from './routes';
import { getOptions } from '.';

/**
 * Get all reviews for a content item.
 * @param {string} contentId Id of content associated with review.
 * @param {string} token Token of current user (Optional).
 */
export const fetchReviews = async (contentId: string, token?: string) => {
  const request: AxiosResponse<MultipleReviewsResponse> = await axios.get(
    reviewsUrl(contentId),
    getOptions(token)
  );
  return request.data;
};

/**
 * Get a review.
 * @param {string} contentId Id of content associated with review.
 * @param {string} id Id of the review to be fetched.
 * @param {string} token Token of current user (Optional).
 */
export const fetchReviewItem = async (
  contentId: string,
  id: string,
  token?: string
) => {
  const request: AxiosResponse<SingleReviewResponse> = await axios.get(
    reviewUrl(contentId, id),
    getOptions(token)
  );
  return request.data;
};

/**
 * Create a review.
 * @param {string} contentId Id of content associated with review.
 * @param {NewReviewRequest} body Review to be added.
 * @param {string} token Token of current user.
 */
export const createReview = async (
  contentId: string,
  body: NewReviewRequest,
  token: string
) => {
  const request: AxiosResponse<SingleReviewResponse> = await axios.post(
    reviewsUrl(contentId),
    body,
    getOptions(token)
  );
  return request.data;
};

/**
 * Update a review.
 * @param {string} contentId Id of content associated with review.
 * @param {string} id Id of the review to be updated.
 * @param {UpdateReviewRequest} body Updated content of the review.
 * @param {string} token Token of current user.
 */
export const updateReview = async (
  contentId: string,
  id: string,
  body: UpdateReviewRequest,
  token: string
) => {
  const request: AxiosResponse<SingleReviewResponse> = await axios.post(
    reviewUrl(contentId, id),
    body,
    getOptions(token)
  );
  return request.data;
};

/**
 * Delete a review.
 * @param {string} contentId Id of content associated with review.
 * @param {string} id Id of the review to be updated.
 * @param token Token of current user.
 */
export const deleteReview = async (
  contentId: string,
  id: string,
  token: string
) => {
  const request: AxiosResponse<SingleReviewResponse> = await axios.delete(
    reviewUrl(contentId, id),
    getOptions(token)
  );
  return request.data;
};
