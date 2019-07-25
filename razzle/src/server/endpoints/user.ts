import express from 'express';
import uuidv4 from 'uuid/v4';
import {
  LoginUserRequest,
  RegisterUser,
  RegisterUserRequest,
  UpdateUser,
  UserResponse,
  UpdateUserRequest
} from '../../common';
import { createToken, getAuthUser, getTokenFromHeader } from '../auth';
import { User, getUserCollection, getDbUser } from '../database';
import { status, ErrorResponse } from '../types';
import { formatUser } from '../utility';

function getUserErrors(user: RegisterUser | UpdateUser, currentUser?: User) {
  const users = getUserCollection();
  const errors: ErrorResponse = {
    email: undefined,
    username: undefined
  };

  let duplicateEmails: User[] = [];
  let duplicateUsernames: User[] = [];

  if ((currentUser && currentUser.email !== user.email) || !currentUser) {
    duplicateEmails = users.find({ email: { $eq: user.email } });
  }

  if ((currentUser && currentUser.username !== user.username) || !currentUser) {
    duplicateUsernames = users.find({
      username: { $eq: user.username }
    });
  }

  if (duplicateEmails.length > 0) {
    errors.email = ['has already been taken'];
  }

  if (duplicateUsernames.length > 0) {
    errors.username = ['has already been taken'];
  }
  return errors;
}

/**
 * @summary Login a user.
 * @method POST
 * @authorization None
 * @url /api/v1/users/login
 */
export async function login(req: express.Request, res: express.Response) {
  if (!req.body) {
    const reqErrors: ErrorResponse = {
      body: ['not provided']
    };
    res.status(status.BAD_REQUEST).json(reqErrors);
    return;
  }

  const loginErrors: ErrorResponse = {
    'email or password': ['is invalid']
  };

  const { user: loginUser } = req.body as LoginUserRequest;

  if (!loginUser) {
    const bodyErrors: ErrorResponse = {
      user: ['post body is undefined']
    };
    res.status(status.BAD_REQUEST).json(bodyErrors);
    return;
  }

  const storedUser = getDbUser('email', loginUser.email);

  if (storedUser) {
    if (loginUser.password === storedUser.password) {
      const dbUser = getDbUser('email', loginUser.email);

      if (dbUser) {
        const token: string = createToken(dbUser.id);
        const response: UserResponse = {
          user: formatUser(dbUser, token)
        };
        res.send(response);
        return;
      }
    } else {
      res.status(status.UNPROCESSABLE).json(loginErrors);
      return;
    }
  }
  res.status(status.UNPROCESSABLE).json(loginErrors);
}

/**
 * @summary Register a user.
 * @method POST
 * @authorization None
 * @url /api/v1/users
 */
export async function createUser(req: express.Request, res: express.Response) {
  if (!req.body) {
    const reqErrors: ErrorResponse = {
      body: ['not provided']
    };
    res.status(status.BAD_REQUEST).json(reqErrors);
    return;
  }

  const users = getUserCollection();
  const { user: newUser } = req.body as RegisterUserRequest;

  if (!newUser) {
    const bodyErrors: ErrorResponse = {
      user: ['post body is undefined']
    };
    res.status(status.BAD_REQUEST).json(bodyErrors);
    return;
  }

  const errors = getUserErrors(newUser);

  const duplicate = errors.email || errors.username;

  // @TODO: Hash password
  if (!duplicate) {
    const dbUser = users.insertOne({
      bio: '',
      email: newUser.email,
      id: uuidv4(),
      password: newUser.password,
      image: '',
      ratings: [],
      role: newUser.role,
      watchList: [],
      username: newUser.username
    });

    if (dbUser) {
      const token: string = createToken(dbUser.id);
      const response: UserResponse = {
        user: formatUser(dbUser, token)
      };
      res.status(status.CREATED).send(response);
      return;
    }
  }

  return res.status(status.UNPROCESSABLE).json({
    errors
  });
}

/**
 * @summary Get current user.
 * @method GET
 * @authorization Required
 * @url /api/v1/user
 */
export async function getCurrentUser(
  req: express.Request,
  res: express.Response
) {
  const currentUser = getAuthUser(req);
  const token = getTokenFromHeader(req) || '';
  if (currentUser) {
    const response: UserResponse = {
      user: formatUser(currentUser, token)
    };
    res.send(response);
  }
}

/**
 * @summary Update current user.
 * @method PUT
 * @authorization Required
 * @url /api/v1/user
 */
export async function updateCurrentUser(
  req: express.Request,
  res: express.Response
) {
  if (!req.body) {
    const reqErrors: ErrorResponse = {
      body: ['not provided']
    };
    res.status(status.BAD_REQUEST).json(reqErrors);
    return;
  }

  const users = getUserCollection();
  const currentUser = getAuthUser(req);
  const token = getTokenFromHeader(req) || '';
  const { user } = req.body as UpdateUserRequest;

  if (!user) {
    const bodyErrors: ErrorResponse = {
      user: ['post body is undefined']
    };
    res.status(status.BAD_REQUEST).json(bodyErrors);
    return;
  }

  const { bio, email, image, password, username } = user;

  if (currentUser) {
    const errors = getUserErrors(user, currentUser);
    const duplicate = errors.email || errors.username;

    if (!duplicate) {
      const updatedUser: User = {
        ...currentUser,
        bio: bio ? bio : '',
        email: email || currentUser.email,
        password: password || currentUser.password,
        image: image ? image : '',
        username: username || currentUser.username
      };

      const updatedDbUser = users.update(updatedUser);
      if (token) {
        const response: UserResponse = {
          user: formatUser(updatedDbUser, token)
        };
        res.send(response);
        return;
      }
    }
    res.status(status.UNPROCESSABLE).json({
      errors
    });
    return;
  }
}
