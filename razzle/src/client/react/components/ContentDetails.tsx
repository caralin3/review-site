import React from 'react';
import { Link } from 'react-router-dom';
import { Content, User } from '../../../common';
import { routes } from '../routes';
import { StarRating, WatchButton } from '.';
import { user1 } from '../../mock';

export interface ContentDetailsProps {
  content: Content;
  onRate: (star: number) => void;
  onWatch: () => void;
  user?: User;
}

export const ContentDetails: React.FC<ContentDetailsProps> = ({
  content,
  onRate,
  onWatch,
  user = user1
}) => {
  const titleSection = (
    <div className="content__header">
      <span className="content__title">
        <div>{content.title}</div>
        {content.network && (
          <span className="content__network">{content.network}</span>
        )}
      </span>
      <StarRating
        rating={content.rating}
        myRating={content.myRating}
        onClick={onRate}
      />
    </div>
  );

  const detailsSection = (
    <div className="content__details">
      <p>{content.type}</p>
      <p>
        {content.type === 'Movie'
          ? content.year
          : `${content.year}-${content.endYear ? content.endYear : ''}`}
      </p>
      <p>{content.mpa}</p>
      <p>{content.duration} mins</p>
      {content.genres && (
        <p className="show-medium">{content.genres.toString()}</p>
      )}
      {content.genres && (
        <p className="show-small">{content.genres.slice(0, 2).toString()}</p>
      )}
    </div>
  );

  const peopleSection = (
    <>
      {content.director && (
        <p>
          <strong>
            {content.type === 'Movie' ? 'Director' : 'Creator'}:&nbsp;&nbsp;
          </strong>
          {content.director}
        </p>
      )}
      {content.actors && (
        <p>
          <strong>Actors:&nbsp;&nbsp;</strong>
          {content.actors.toString()}
        </p>
      )}
    </>
  );

  return (
    <div className="content">
      <div className="show-small">
        {titleSection}
        {detailsSection}
      </div>
      <div className="content__mobile show-small">
        <img
          className="content__image"
          src={content.image}
          alt="poster image"
        />
        <p className="content__synopsis">
          {content.synopsis && content.synopsis.substring(0, 175)}
          {content.synopsis && content.synopsis.length > 175 && '...'}
          <span className="content__footer-mobile">
            {user && (
              <WatchButton watching={content.watchList} onClick={onWatch} />
            )}
          </span>
        </p>
      </div>
      <div className="show-small">{peopleSection}</div>
      <img
        className="content__image show-medium"
        src={content.image}
        alt="poster image"
      />
      <div className="content__text show-medium">
        <div>
          {titleSection}
          {detailsSection}
        </div>
        <p className="content__synopsis">
          {content.synopsis && content.synopsis.substring(0, 450)}
          {content.synopsis && content.synopsis.length > 450 && '...'}
        </p>
        {peopleSection}
        <p className="content__footer">
          {user && (
            <WatchButton watching={content.watchList} onClick={onWatch} />
          )}
        </p>
      </div>
    </div>
  );
};
