import express from 'express';
import uuidv4 from 'uuid/v4';
import {
  MultipleEpisodesResponse,
  NewEpisodeRequest,
  SingleEpisodeResponse,
  UpdateEpisodeRequest
} from '../../common';
import { getAuthUser } from '../auth';
import {
  Episode,
  getEpisodeCollection,
  getDbEpisode,
  getDbContent
} from '../database';
import { status, ErrorResponse } from '../types';

/**
 * @summary Create an episode. Only admin role.
 * @method POST
 * @authorization Required
 * @url /api/v1/content/:id/episodes
 */
export async function createEpisode(
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

  const currentUser = getAuthUser(req);
  if (currentUser) {
    const { episode } = req.body as NewEpisodeRequest;

    if (!episode) {
      const bodyErrors: ErrorResponse = {
        episode: ['post body is undefined']
      };
      res.status(status.BAD_REQUEST).json(bodyErrors);
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
    if (currentUser.role !== 'admin') {
      res.status(status.FORBIDDEN).json({ user: ['does not have permission'] });
      return;
    }
    const episodes = getEpisodeCollection();
    const newEpisode: Episode = {
      ...episode,
      contentId: dbContent.id,
      id: uuidv4()
    };
    const dbEpisode = episodes.insertOne(newEpisode);

    if (dbEpisode) {
      const response: SingleEpisodeResponse = {
        episode: dbEpisode
      };
      res.status(status.CREATED).send(response);
      return;
    }
    res
      .status(status.UNPROCESSABLE)
      .json({ episode: ['could not be created'] });
    return;
  }
}

/**
 * @summary Get episodes.
 *
 * @description Get list of episodes for a season and filter by
 * year, number, limit, or offset
 *
 * @method GET
 * @authorization Optional
 * @url /api/v1/content/:id/episodes
 */
export async function getEpisodes(req: express.Request, res: express.Response) {
  if (!req.params || !req.params.id) {
    const reqErrors: ErrorResponse = {
      id: ['not provided']
    };
    res.status(status.BAD_REQUEST).json(reqErrors);
    return;
  }

  // if (!req.query.season) {
  //   const reqErrors: ErrorResponse = {
  //     season: ['not provided']
  //   };
  //   res.status(status.BAD_REQUEST).json(reqErrors);
  //   return;
  // }

  const dbContent = getDbContent('id', req.params.id);
  if (!dbContent) {
    const error: ErrorResponse = {
      content: [`with ${req.params.id} not found`]
    };
    res.status(status.UNPROCESSABLE).json(error);
    return;
  }

  const { limit, offset, num, season, year } = req.query;

  const episodes = getEpisodeCollection();
  const filtered = episodes.chain();
  filtered.find({ contentId: { $eq: req.params.id } });
  if (season) {
    const s = parseInt(season, 10);
    filtered.find({ season: { $between: [s - 1, s + 1] } });
  }
  if (num) {
    filtered.find({ num: { $eq: parseInt(num, 10) } });
  }
  if (year) {
    filtered.where(ep => {
      const date = new Date(ep.date);
      return date.getFullYear() === parseInt(year, 10);
    });
  }
  const filteredEpisodes: Episode[] = filtered
    .simplesort('num')
    .limit(limit || 10)
    .offset(offset || 0)
    .data();

  if (filteredEpisodes.length > 0) {
    const response: MultipleEpisodesResponse = {
      episodes: filteredEpisodes,
      count: filtered.data().length
    };
    res.send(response);
    return;
  }
  res.send({
    episodes: [],
    count: 0
  } as MultipleEpisodesResponse);
}

/**
 * @summary Get an episode.
 * @method GET
 * @authorization Optional
 * @url /api/v1/content/:id/episodes/:episodeId
 */
export async function getEpisode(req: express.Request, res: express.Response) {
  if (!req.params || !req.params.id || !req.params.episodeId) {
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

  const dbEpisode = getDbEpisode('id', req.params.episodeId);
  if (!dbEpisode) {
    const error: ErrorResponse = {
      episode: [`with ${req.params.episodeId} not found`]
    };
    res.status(status.UNPROCESSABLE).json(error);
    return;
  }

  const response: SingleEpisodeResponse = { episode: dbEpisode };
  res.status(status.OK).send(response);
}

/**
 * @summary Update an episode. Only admin role.
 * @method PUT
 * @authorization Required
 * @url /api/v1/content/:id/episodes/:episodeId
 */
export async function updateEpisode(
  req: express.Request,
  res: express.Response
) {
  if (!req.params || !req.params.id || !req.params.episodeId) {
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
    if (currentUser.role !== 'admin') {
      res.status(status.FORBIDDEN).json({ user: ['does not have permission'] });
      return;
    }
    const { episode } = req.body as UpdateEpisodeRequest;
    if (!episode) {
      const bodyErrors: ErrorResponse = {
        episode: ['post body is undefined']
      };
      res.status(status.BAD_REQUEST).json(bodyErrors);
      return;
    }

    const dbEpisode = getDbEpisode('id', req.params.episodeId);

    if (!dbEpisode) {
      const bodyErrors: ErrorResponse = {
        episode: [`with ${req.params.episodeId} not found`]
      };
      res.status(status.UNPROCESSABLE).json(bodyErrors);
      return;
    }

    const episodes = getEpisodeCollection();
    const { date, duration, num, season, synopsis, title } = episode;

    const changedEpisode: Episode = {
      ...dbEpisode,
      date: date || dbEpisode.date,
      duration: duration || dbEpisode.duration,
      num: num || dbEpisode.num,
      season: season || dbEpisode.season,
      synopsis: synopsis || dbEpisode.synopsis,
      title: title || dbEpisode.title
    };
    const updatedEpisode = episodes.update(changedEpisode);

    const response: SingleEpisodeResponse = { episode: updatedEpisode };
    res.send(response);
    return;
  }
}

/**
 * @summary Delete an episode. Only admin role.
 * @method DELETE
 * @authorization Required
 * @url /api/v1//content/:id/episodes/:episodeId
 */
export async function deleteEpisode(
  req: express.Request,
  res: express.Response
) {
  if (!req.params || !req.params.id || !req.params.episodeId) {
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
    if (currentUser.role !== 'admin') {
      res.status(status.FORBIDDEN).json({ user: ['does not have permission'] });
      return;
    }
    const dbEpisode = getDbEpisode('id', req.params.episodeId);

    if (!dbEpisode) {
      const error: ErrorResponse = {
        episode: [`with ${req.params.episodeId} not found`]
      };
      res.status(status.UNPROCESSABLE).json(error);
      return;
    }
    const episodes = getEpisodeCollection();
    const deletedEpisode = episodes.remove(dbEpisode);
    if (deletedEpisode) {
      const response = { id: deletedEpisode.id };
      res.send(response);
      return;
    }
    const deleteError: ErrorResponse = {
      episode: [`with ${req.params.episodeId} could not be deleted`]
    };
    res.status(status.UNPROCESSABLE).json(deleteError);
    return;
  }
}
