import moment from 'moment';
import React from 'react';
import { Episode } from '../../../common';

export interface EpisodeItemProps {
  episode: Episode;
}

export const EpisodeItem: React.FC<EpisodeItemProps> = ({ episode }) => (
  <div className="episode-item">
    <div className="episode-item__row">
      <h2 className="episode-item__title">{episode.title}</h2>
      <p>Aired {moment(episode.date).format('MMM DD, YYYY')}</p>
    </div>
    <div className="episode-item__row">
      <p>Season {episode.season}</p>
      <span className="episode-item__row">
        <p>Episode {episode.num}</p>
        <p>&nbsp;&nbsp;({episode.duration} mins)</p>
      </span>
    </div>
    <p className="episode-item__synopsis">
      <strong>Synopsis:</strong>&nbsp;{episode.synopsis}
    </p>
  </div>
);
