import express from 'express';
import uuidv4 from 'uuid/v4';
import {
  MultipleContentResponse,
  NewContentRequest,
  SingleContentResponse,
  UpdateContentRequest
} from '../../common';
import { getAuthUser } from '../auth';
import db, {
  Content,
  getContentCollection,
  getDbContent,
  getDbUser,
  getUserCollection
} from '../database';
import { status, ErrorResponse } from '../types';
import { formatContent, calcMyRating, calcAvgRating } from '../utility';

/**
 * @summary Create movie or tv content. Only admin role.
 * @method POST
 * @authorization Required
 * @url /api/v1/content
 */
export async function createContent(
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

  const { content } = req.body as NewContentRequest;

  if (!content) {
    const bodyErrors: ErrorResponse = {
      content: ['post body is undefined']
    };
    res.status(status.BAD_REQUEST).json(bodyErrors);
    return;
  }

  const currentUser = getAuthUser(req);
  if (currentUser) {
    if (currentUser.role !== 'admin') {
      res.status(status.FORBIDDEN).json({ user: ['does not have permission'] });
      return;
    }
    const allContent = getContentCollection();

    const newContent: Content = {
      ...content,
      endYear: content.endYear || 0,
      id: uuidv4(),
      network: content.network || ''
    };
    const dbContent = allContent.insertOne(newContent);

    if (dbContent) {
      const response: SingleContentResponse = {
        content: formatContent(dbContent, 0, false)
      };
      res.status(status.CREATED).send(response);
      return;
    }
    res
      .status(status.UNPROCESSABLE)
      .json({ content: ['could not be created'] });
    return;
  }
}

/**
 * @summary Get all movies and tv shows.
 *
 * @description Get list of content for a season and filter by
 * year, number, limit, or offset
 *
 * @method GET
 * @authorization Optional
 * @url /api/v1/content
 */
export async function getContent(req: express.Request, res: express.Response) {
  const {
    actor,
    director,
    genres,
    limit,
    mpa,
    myRating,
    network,
    offset,
    rating,
    title,
    type,
    watchList,
    year
  } = req.query;
  const currentUser = getAuthUser(req);
  const contentColl = getContentCollection();
  const filtered = contentColl.chain();
  if (actor) {
    filtered.find({ actors: { $contains: actor } });
  }
  if (director) {
    filtered.find({ director: { $eq: director } });
  }
  if (genres) {
    const genreList: string[] = genres.split(',');
    genreList.forEach(genre => {
      filtered.find({ genres: { $containsAny: genre.trim() } });
    });
  }
  if (mpa) {
    filtered.find({ mpa: { $eq: mpa } });
  }
  if (myRating) {
    if (currentUser) {
      filtered.find({
        id: {
          $in: currentUser.ratings.map(r => r.contentId)
        }
      });
    }
  }
  if (network) {
    filtered.find({ network: { $eq: network } });
  }
  if (rating) {
    contentColl.find().forEach(con => {
      const avgRating = calcAvgRating(con);
      if (parseInt(rating, 10) === avgRating) {
        filtered.find({ id: { $eq: con.id } });
      }
    });
  }
  if (title) {
    filtered.find({ title: { $eq: title } });
  }
  if (type) {
    filtered.find({ type: { $eq: type } });
  }
  if (watchList) {
    const user = getDbUser('username', watchList);
    if (user) {
      filtered.find({ id: { $in: user.watchList } });
    }
  }
  if (year) {
    filtered.find({ year: { $eq: parseInt(year, 10) } });
  }
  const filteredContent: Content[] = filtered
    .simplesort('title')
    .limit(limit || 10)
    .offset(offset || 0)
    .data();

  const allContent = filteredContent.map(con => {
    const myRating = currentUser ? calcMyRating(currentUser, con) : undefined;
    const rating = calcAvgRating(con);
    const watchList = currentUser
      ? currentUser.watchList.includes(con.id)
      : false;
    return formatContent(con, rating, watchList, myRating);
  });

  if (filteredContent.length > 0) {
    const response: MultipleContentResponse = {
      allContent,
      count: filtered.data().length
    };
    res.send(response);
    return;
  }
  res.send({
    allContent: [],
    count: 0
  } as MultipleContentResponse);
}

/**
 * @summary Get a movie or tv show.
 * @method GET
 * @authorization Optional
 * @url /api/v1/content/:id
 */
export async function getContentItem(
  req: express.Request,
  res: express.Response
) {
  if (!req.params || !req.params.id) {
    const reqErrors: ErrorResponse = {
      id: ['not provided']
    };
    res.status(status.BAD_REQUEST).json(reqErrors);
    return;
  }

  const dbContent = getDbContent('id', req.params.id);

  if (!dbContent) {
    const error: ErrorResponse = {
      content: [`with ${req.params.id} not found`]
    };
    res.status(status.UNPROCESSABLE).json(error);
    return;
  }
  const currentUser = getAuthUser(req);
  const myRating = currentUser
    ? calcMyRating(currentUser, dbContent)
    : undefined;
  const rating = calcAvgRating(dbContent);
  const watchList = currentUser
    ? currentUser.watchList.includes(dbContent.id)
    : false;
  const response: SingleContentResponse = {
    content: formatContent(dbContent, rating, watchList, myRating)
  };
  res.status(status.OK).send(response);
}

/**
 * @summary Update movie or tv content. Only admin role.
 * @method PUT
 * @authorization Required
 * @url /api/v1/content/:id
 */
export async function updateContent(
  req: express.Request,
  res: express.Response
) {
  if (!req.params || !req.params.id) {
    const reqErrors: ErrorResponse = {
      id: ['not provided']
    };
    res.status(status.BAD_REQUEST).json(reqErrors);
    return;
  }
  const currentUser = getAuthUser(req);
  if (currentUser) {
    if (currentUser.role !== 'admin') {
      res.status(status.FORBIDDEN).json({ user: ['does not have permission'] });
      return;
    }
    const { content } = req.body as UpdateContentRequest;
    if (!!content) {
      const bodyErrors: ErrorResponse = {
        content: ['post body is undefined']
      };
      res.status(status.BAD_REQUEST).json(bodyErrors);
      return;
    }

    const dbContent = getDbContent('id', req.params.id);

    if (!dbContent) {
      const bodyErrors: ErrorResponse = {
        content: [`with ${req.params.id} not found`]
      };
      res.status(status.UNPROCESSABLE).json(bodyErrors);
      return;
    }

    const allContent = getContentCollection();
    const {
      actors,
      director,
      duration,
      endYear,
      image,
      genres,
      mpa,
      network,
      synopsis,
      title,
      type,
      year
    } = content;

    const curType = type || dbContent.type;

    const changedContent: Content = {
      ...dbContent,
      actors: actors || dbContent.actors,
      director: director || dbContent.director,
      duration: duration || dbContent.duration,
      endYear: curType === 'Series' ? endYear || dbContent.endYear : 0,
      image: image || dbContent.image,
      genres: genres || dbContent.genres,
      mpa: mpa || dbContent.mpa,
      network: curType === 'Series' ? network || dbContent.network : '',
      synopsis: synopsis || dbContent.synopsis,
      title: title || dbContent.title,
      type: type || dbContent.type,
      year: year || dbContent.year
    };
    const updatedContent = allContent.update(changedContent);
    const myRating = currentUser
      ? calcMyRating(currentUser, dbContent)
      : undefined;
    const rating = calcAvgRating(dbContent);
    const watchList = currentUser.watchList.includes(updatedContent.id);
    const response: SingleContentResponse = {
      content: formatContent(updatedContent, rating, watchList, myRating)
    };
    res.send(response);
    return;
  }
}

/**
 * @summary Delete movie or tv content. Only admin role.
 * @method DELETE
 * @authorization Required
 * @url /api/v1/content/:id
 */
export async function deleteContent(
  req: express.Request,
  res: express.Response
) {
  if (!req.params || !req.params.id) {
    const reqErrors: ErrorResponse = {
      id: ['not provided']
    };
    res.status(status.BAD_REQUEST).json(reqErrors);
    return;
  }
  const currentUser = getAuthUser(req);
  if (currentUser) {
    if (currentUser.role !== 'admin') {
      res.status(status.FORBIDDEN).json({ user: ['does not have permission'] });
      return;
    }
    const dbContent = getDbContent('id', req.params.id);

    if (!dbContent) {
      const error: ErrorResponse = {
        content: [`with ${req.params.id} not found`]
      };
      res.status(status.UNPROCESSABLE).json(error);
      return;
    }
    const allContent = getContentCollection();
    const deletedContent = allContent.remove(dbContent);
    if (deletedContent) {
      const response = { id: deletedContent.id };
      res.send(response);
      return;
    }
    const deleteError: ErrorResponse = {
      content: [`with ${req.params.id} could not be deleted`]
    };
    res.status(status.UNPROCESSABLE).json(deleteError);
    return;
  }
}

/**
 * @summary Create rating for movie or tv content.
 * @method POST
 * @authorization Required
 * @url /api/v1/content/:id/rating
 */
export async function addRating(req: express.Request, res: express.Response) {
  if (!req.params || !req.params.id) {
    const reqErrors: ErrorResponse = {
      id: ['not provided']
    };
    res.status(status.BAD_REQUEST).json(reqErrors);
    return;
  }

  const { rating } = req.body as { rating: number };
  if (!rating) {
    const bodyErrors: ErrorResponse = {
      rating: ['post body is undefined']
    };
    res.status(status.BAD_REQUEST).json(bodyErrors);
    return;
  }

  const currentUser = getAuthUser(req);
  if (currentUser) {
    const dbContent = getDbContent('id', req.params.id);
    if (!dbContent) {
      const error: ErrorResponse = {
        content: [`with ${req.params.id} not found`]
      };
      res.status(status.UNPROCESSABLE).json(error);
      return;
    }
    const users = getUserCollection();
    const updatedUser = users.update({
      ...currentUser,
      ratings: [...currentUser.ratings, { rating, contentId: dbContent.id }]
    });
    if (!updatedUser) {
      const error: ErrorResponse = {
        rating: ['could not be added']
      };
      res.status(status.UNPROCESSABLE).json(error);
      return;
    }
    const avgRating = calcAvgRating(dbContent);
    const watchList = currentUser.watchList.includes(dbContent.id);
    const response: SingleContentResponse = {
      content: formatContent(dbContent, avgRating, watchList, rating)
    };
    res.send(response);
  }
}

/**
 * @summary Update rating for movie or tv content.
 * @method PUT
 * @authorization Required
 * @url /api/v1/content/:id/rating
 */
export async function updateRating(
  req: express.Request,
  res: express.Response
) {
  if (!req.params || !req.params.id) {
    const reqErrors: ErrorResponse = {
      id: ['not provided']
    };
    res.status(status.BAD_REQUEST).json(reqErrors);
    return;
  }

  const { rating } = req.body as { rating: number };
  if (!rating) {
    const bodyErrors: ErrorResponse = {
      rating: ['post body is undefined']
    };
    res.status(status.BAD_REQUEST).json(bodyErrors);
    return;
  }

  const currentUser = getAuthUser(req);
  if (currentUser) {
    const dbContent = getDbContent('id', req.params.id);
    if (!dbContent) {
      const error: ErrorResponse = {
        content: [`with ${req.params.id} not found`]
      };
      res.status(status.UNPROCESSABLE).json(error);
      return;
    }
    const users = getUserCollection();
    const updatedUser = users.update({
      ...currentUser,
      ratings: [
        ...currentUser.ratings.filter(r => r.contentId !== dbContent.id),
        { rating, contentId: dbContent.id }
      ]
    });
    if (!updatedUser) {
      const error: ErrorResponse = {
        rating: ['could not be updated']
      };
      res.status(status.UNPROCESSABLE).json(error);
      return;
    }
    const avgRating = calcAvgRating(dbContent);
    const watchList = currentUser.watchList.includes(dbContent.id);
    const response: SingleContentResponse = {
      content: formatContent(dbContent, avgRating, watchList, rating)
    };
    res.send(response);
  }
}

/**
 * @summary Add movie or tv content to current user watch list.
 * @method POST
 * @authorization Required
 * @url /api/v1/content/:id/watchlist
 */
export async function addToWatchList(
  req: express.Request,
  res: express.Response
) {
  if (!req.params || !req.params.id) {
    const reqErrors: ErrorResponse = {
      id: ['not provided']
    };
    res.status(status.BAD_REQUEST).json(reqErrors);
    return;
  }
  const currentUser = getAuthUser(req);
  if (currentUser) {
    const dbContent = getDbContent('id', req.params.id);
    if (!dbContent) {
      const error: ErrorResponse = {
        content: [`with ${req.params.id} not found`]
      };
      res.status(status.UNPROCESSABLE).json(error);
      return;
    }
    const users = getUserCollection();
    const updatedUser = users.update({
      ...currentUser,
      watchList: [...currentUser.watchList, dbContent.id]
    });
    if (!updatedUser) {
      const error: ErrorResponse = {
        watchList: ['could not be updated']
      };
      res.status(status.UNPROCESSABLE).json(error);
      return;
    }
    const myRating = currentUser
      ? calcMyRating(currentUser, dbContent)
      : undefined;
    const rating = calcAvgRating(dbContent);
    const response: SingleContentResponse = {
      content: formatContent(dbContent, rating, true, myRating)
    };
    res.send(response);
  }
}

/**
 * @summary Delete movie or tv content from current user watch list.
 * @method DELETE
 * @authorization Required
 * @url /api/v1/content/:id/watchlist
 */
export async function deleteFromWatchList(
  req: express.Request,
  res: express.Response
) {
  if (!req.params || !req.params.id) {
    const reqErrors: ErrorResponse = {
      id: ['not provided']
    };
    res.status(status.BAD_REQUEST).json(reqErrors);
    return;
  }
  const currentUser = getAuthUser(req);
  if (currentUser) {
    const dbContent = getDbContent('id', req.params.id);
    if (!dbContent) {
      const error: ErrorResponse = {
        content: [`with ${req.params.id} not found`]
      };
      res.status(status.UNPROCESSABLE).json(error);
      return;
    }
    const users = getUserCollection();
    const updatedUser = users.update({
      ...currentUser,
      watchList: currentUser.watchList.filter(id => id !== dbContent.id)
    });
    if (!updatedUser) {
      const error: ErrorResponse = {
        watchList: ['could not be updated']
      };
      res.status(status.UNPROCESSABLE).json(error);
      return;
    }
    const myRating = currentUser
      ? calcMyRating(currentUser, dbContent)
      : undefined;
    const rating = calcAvgRating(dbContent);
    const response: SingleContentResponse = {
      content: formatContent(dbContent, rating, false, myRating)
    };
    res.send(response);
  }
}
