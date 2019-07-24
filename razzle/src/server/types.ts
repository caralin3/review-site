export const status = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400, // invalid syntax,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403, // client doen't have access rights to the content
  NOT_FOUND: 404,
  UNPROCESSABLE: 422, // semantic errors
  INTERNAL_SERVER_ERROR: 500
};

export interface ErrorResponse {
  [key: string]: string[] | undefined;
}
