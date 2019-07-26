import axios, { AxiosResponse } from 'axios';
import {
  LoginUserRequest,
  RegisterUserRequest,
  UpdateUserRequest,
  UserResponse
} from '../../common';
import { loginUrl, registrationUrl, userUrl, profileUrl } from './routes';

/**
 * Set header options to be sent in request.
 * @param {string} token Token of current user.
 */
export const createOptions = (token: string) => ({
  headers: {
    Authorization: `Token ${token}`
  }
});

/**
 * Header options to be sent in request.
 * @param {string} token Token of current user.
 */
export const getOptions = (token?: string) => {
  let options;
  if (token) {
    options = createOptions(token);
  }
  return options;
};

/**
 * Login a user.
 * @param {LoginUserRequest} body User credentials used to login.
 */
export const login = async (body: LoginUserRequest) => {
  const request: AxiosResponse<UserResponse> = await axios.post(loginUrl, body);
  return request.data;
};

/**
 * Register a user.
 * @param {RegisterUserRequest} body User info used to register.
 */
export const register = async (body: RegisterUserRequest) => {
  const request: AxiosResponse<UserResponse> = await axios.post(
    registrationUrl,
    body
  );
  return request.data;
};

/**
 * Get current user.
 * @param {string} token Token of current user.
 */
export const fetchCurrentUser = async (token: string) => {
  const request: AxiosResponse<UserResponse> = await axios.get(
    userUrl,
    getOptions(token)
  );
  return request.data;
};

/**
 * Update current user.
 * @param {UpdateUserRequest} body User info to be updated.
 * @param {string} token Token of current user.
 */
export const updateUser = async (body: UpdateUserRequest, token: string) => {
  const request: AxiosResponse<UserResponse> = await axios.put(
    userUrl,
    body,
    getOptions(token)
  );
  return request.data;
};

/**
 * Get user profile.
 * @param {string} username Username of the profile.
 * @param {string} token Token of current user (Optional).
 */
export const fetchUserProfile = async (username: string, token?: string) => {
  const request: AxiosResponse<UserResponse> = await axios.get(
    profileUrl(username),
    getOptions(token)
  );
  return request.data;
};
