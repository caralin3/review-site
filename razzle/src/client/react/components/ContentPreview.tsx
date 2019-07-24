import React from 'react';
import { Link } from 'react-router-dom';
import { Content, User } from '../../../common';
import { routes } from '../routes';
import { StarRating, WatchButton } from '.';

export interface ContentPreviewProps {
  content: Content;
  onRate: (star: number) => void;
  onWatch: () => void;
  user?: User;
}

export const ContentPreview: React.FC<ContentPreviewProps> = ({
  content,
  onRate,
  onWatch,
  user
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
        user={user}
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
      <p className="show-medium">{content.genres.toString()}</p>
      <p className="show-small">{content.genres.slice(0, 2).toString()}</p>
    </div>
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
          {content.synopsis.substring(0, 175)}
          {content.synopsis.length > 175 && '...'}
          <span className="content__footer-mobile">
            <Link
              className="cta"
              to={
                content.type === 'Movie'
                  ? `${routes.movie.path}/${content.id}`
                  : `${routes.show.path}/${content.id}`
              }
            >
              Read more...
            </Link>
            {user && (
              <WatchButton watching={content.watchList} onClick={onWatch} />
            )}
          </span>
        </p>
      </div>
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
          {content.synopsis.substring(0, 450)}
          {content.synopsis.length > 450 && '...'}
        </p>
        <p className="content__footer">
          <Link
            className="cta"
            to={
              content.type === 'Movie'
                ? `${routes.movie.path}/${content.id}`
                : `${routes.show.path}/${content.id}`
            }
          >
            Read more...
          </Link>
          {user && (
            <WatchButton watching={content.watchList} onClick={onWatch} />
          )}
        </p>
      </div>
    </div>
  );
};
