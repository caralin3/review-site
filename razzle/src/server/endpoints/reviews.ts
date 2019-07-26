import express from 'express';
import uuidv4 from 'uuid/v4';
import {
  MultipleReviewsResponse,
  NewReviewRequest,
  SingleReviewResponse,
  UpdateReviewRequest
} from '../../common';
import { getAuthUser } from '../auth';
import {
  getDbContent,
  getDbReview,
  getDbUser,
  getReviewCollection,
  getUserCollection,
  Review,
  User
} from '../database';
import { status, ErrorResponse } from '../types';
import { formatReview } from '../utility';

/**
 * @summary Create an review. Only admin role.
 * @method POST
 * @authorization Required
 * @url /api/v1/content/:id/reviews
 */
export async function createReview(
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

  if (!req.body) {
    const reqErrors: ErrorResponse = {
      body: ['not provided']
    };
    res.status(status.BAD_REQUEST).json(reqErrors);
    return;
  }

  const { review } = req.body as NewReviewRequest;

  if (!review) {
    const bodyErrors: ErrorResponse = {
      review: ['post body is undefined']
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
    const reviews = getReviewCollection();
    const newReview: Review = {
      body: review.body,
      contentId: req.params.id,
      created: new Date().toISOString(),
      id: uuidv4(),
      userId: currentUser.id
    };
    const dbReview = reviews.insertOne(newReview);
    if (!dbReview) {
      res
        .status(status.UNPROCESSABLE)
        .json({ review: ['could not be created'] });
      return;
    }

    const [dbRating] = currentUser.ratings
      .filter(r => r.contentId === dbReview.contentId)
      .map(r => r.rating);

    let updatedUser;
    if (dbRating) {
      updatedUser = users.update({
        ...currentUser,
        ratings: [
          ...currentUser.ratings.filter(
            r => r.contentId !== dbReview.contentId
          ),
          { rating: review.rating, contentId: dbReview.contentId }
        ]
      });
    } else {
      updatedUser = users.update({
        ...currentUser,
        ratings: [
          ...currentUser.ratings,
          { rating: review.rating, contentId: dbReview.contentId }
        ]
      });
    }

    if (!updatedUser) {
      res
        .status(status.UNPROCESSABLE)
        .json({ review: ['could not be created'] });
      return;
    }
    const response: SingleReviewResponse = {
      review: formatReview(dbReview, review.rating, updatedUser)
    };
    res.status(status.CREATED).send(response);
    return;
  }
}

/**
 * @summary Get reviews.
 *
 * @description Get list of reviews for a season and filter by
 * year, number, limit, or offset
 *
 * @method GET
 * @authorization Optional
 * @url /api/v1/content/:id/reviews
 */
export async function getReviews(req: express.Request, res: express.Response) {
  const dbContent = getDbContent('id', req.params.id);
  if (!dbContent) {
    const error: ErrorResponse = {
      content: [`with ${req.params.id} not found`]
    };
    res.status(status.UNPROCESSABLE).json(error);
    return;
  }

  const { limit, offset, rating } = req.query;
  const reviews = getReviewCollection();
  const filtered = reviews.chain();
  if (rating) {
    reviews.find().forEach(rev => {
      const author = getDbUser('id', rev.userId);
      if (author) {
        const [revRating] = author.ratings
          .filter(r => r.contentId === req.params.id)
          .map(r => r.rating);
        if (revRating) {
          if (parseInt(rating, 10) === revRating) {
            filtered.find({ id: { $eq: rev.id } });
          }
        }
      }
    });
  }
  const filteredReviews: Review[] = filtered
    .sort((a, b) =>
      new Date(a.created) > new Date(b.created)
        ? -1
        : new Date(a.created) < new Date(b.created)
        ? 1
        : 0
    )
    .limit(limit || 10)
    .offset(offset || 0)
    .data();

  if (filteredReviews.length > 0) {
    const allReviews = filteredReviews.map(rev => {
      const author = getDbUser('id', rev.userId);
      if (author) {
        const [rating] = author.ratings
          .filter(r => r.contentId === req.params.id)
          .map(r => r.rating);
        if (rating) {
          return formatReview(rev, rating, author);
        }
      }
      return formatReview(rev, 0, {} as User);
    });

    const response: MultipleReviewsResponse = {
      reviews: allReviews,
      count: filtered.data().length
    };
    res.send(response);
    return;
  }
  res.send({
    reviews: [],
    count: 0
  } as MultipleReviewsResponse);
}

/**
 * @summary Get a review.
 * @method GET
 * @authorization Optional
 * @url /api/v1/content/:id/reviews/:reviewId
 */
export async function getReview(req: express.Request, res: express.Response) {
  if (!req.params || !req.params.id || !req.params.reviewId) {
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

  const dbReview = getDbReview('id', req.params.reviewId);

  if (!dbReview) {
    const error: ErrorResponse = {
      review: [`with ${req.params.id} not found`]
    };
    res.status(status.UNPROCESSABLE).json(error);
    return;
  }
  const author = getDbUser('id', dbReview.userId);
  if (!author) {
    const error: ErrorResponse = {
      review: ['could not find author']
    };
    res.status(status.UNPROCESSABLE).json(error);
    return;
  }

  const [rating] = author.ratings
    .filter(r => r.contentId === req.params.id)
    .map(r => r.rating);
  if (!rating) {
    const error: ErrorResponse = {
      review: ['could not find rating']
    };
    res.status(status.UNPROCESSABLE).json(error);
    return;
  }
  const response: SingleReviewResponse = {
    review: formatReview(dbReview, rating, author)
  };
  res.status(status.OK).send(response);
}

/**
 * @summary Update an review. Only admin role.
 * @method PUT
 * @authorization Required
 * @url /api/v1/content/:id/reviews/:reviewId
 */
export async function updateReview(
  req: express.Request,
  res: express.Response
) {
  if (!req.params || !req.params.id || !req.params.reviewId) {
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

    const { review } = req.body as UpdateReviewRequest;
    if (!review) {
      const bodyErrors: ErrorResponse = {
        review: ['post body is undefined']
      };
      res.status(status.BAD_REQUEST).json(bodyErrors);
      return;
    }

    const dbReview = getDbReview('id', req.params.reviewId);

    if (!dbReview) {
      const bodyErrors: ErrorResponse = {
        review: [`with ${req.params.reviewId} not found`]
      };
      res.status(status.UNPROCESSABLE).json(bodyErrors);
      return;
    }

    const reviews = getReviewCollection();
    const { body, rating } = review;

    const changedReview: Review = {
      ...dbReview,
      body: body || dbReview.body
    };
    const updatedReview = reviews.update(changedReview);
    if (!updatedReview) {
      const error: ErrorResponse = {
        review: ['could not update review']
      };
      res.status(status.UNPROCESSABLE).json(error);
      return;
    }
    const users = getUserCollection();
    const [dbRating] = currentUser.ratings
      .filter(r => r.contentId === dbReview.contentId)
      .map(r => r.rating);

    const currRating = rating ? rating : dbRating ? dbRating : 0;
    const updatedUser = users.update({
      ...currentUser,
      ratings: [
        ...currentUser.ratings.filter(r => r.contentId !== dbReview.contentId),
        { rating: currRating, contentId: dbReview.contentId }
      ]
    });

    if (!updatedUser) {
      const error: ErrorResponse = {
        review: ['could not update review']
      };
      res.status(status.UNPROCESSABLE).json(error);
      return;
    }

    const response: SingleReviewResponse = {
      review: formatReview(updatedReview, currRating, updatedUser)
    };
    res.send(response);
    return;
  }
}

/**
 * @summary Delete an review. Only admin role.
 * @method DELETE
 * @authorization Required
 * @url /api/v1/content/:id/reviews/:reviewId
 */
export async function deleteReview(
  req: express.Request,
  res: express.Response
) {
  if (!req.params || !req.params.id || !req.params.reviewId) {
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
    const dbReview = getDbReview('id', req.params.reviewId);

    if (!dbReview) {
      const error: ErrorResponse = {
        review: [`with ${req.params.reviewId} not found`]
      };
      res.status(status.UNPROCESSABLE).json(error);
      return;
    }
    const reviews = getReviewCollection();
    const deletedReview = reviews.remove(dbReview);
    if (deletedReview) {
      const response = { id: deletedReview.id };
      res.send(response);
      return;
    }
    const deleteError: ErrorResponse = {
      review: [`with ${req.params.reviewId} could not be deleted`]
    };
    res.status(status.UNPROCESSABLE).json(deleteError);
    return;
  }
}
