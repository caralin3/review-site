import React from 'react';
import { ContentType, Genre, MPA } from '../../../common';
import { StarRating, WatchButton } from '.';

export interface ContentPreviewProps {
  duration: number;
  genres: Genre[];
  image: string;
  mpa: MPA;
  myRating?: number;
  network?: string;
  onRate: (star: number) => void;
  onWatch: (e: React.MouseEvent<HTMLButtonElement>) => void;
  rating: number;
  synopsis: string;
  title: string;
  type: ContentType;
  watchList: boolean;
  year: number | string;
}

export const ContentPreview: React.FC<ContentPreviewProps> = ({
  duration,
  genres,
  image,
  mpa,
  myRating,
  network,
  onRate,
  onWatch,
  rating,
  synopsis,
  title,
  type,
  watchList,
  year
}) => {
  const titleSection = (
    <div className="content-preview__header">
      <span className="content-preview__title">
        <div>{title}</div>
        {network && <span className="content-preview__network">{network}</span>}
      </span>
      <StarRating rating={rating} myRating={myRating} onClick={onRate} />
    </div>
  );

  const detailsSection = (
    <div className="content-preview__details">
      <p>{type}</p>
      <p>{year}</p>
      <p>{mpa}</p>
      <p>{duration} mins</p>
      <p className="show-medium">{genres.toString()}</p>
      <p className="show-small">{genres.slice(0, 2).toString()}</p>
    </div>
  );

  return (
    <div className="content-preview">
      <div className="show-small">
        {titleSection}
        {detailsSection}
      </div>
      <div className="content-preview__mobile show-small">
        <img
          className="content-preview__image"
          src={image}
          alt="poster image"
        />
        <p className="content-preview__synopsis">
          {synopsis.substring(0, 175)}
          {synopsis.length > 175 && '...'}
          <span className="content-preview__footer-mobile">
            Read more...
            <WatchButton watching={watchList} onClick={onWatch} />
          </span>
        </p>
      </div>
      <img
        className="content-preview__image show-medium"
        src={image}
        alt="poster image"
      />
      <div className="content-preview__text show-medium">
        <div>
          {titleSection}
          {detailsSection}
        </div>
        <p className="content-preview__synopsis">
          {synopsis.substring(0, 450)}
          {synopsis.length > 450 && '...'}
        </p>
        <p className="content-preview__footer">
          Read more...
          <WatchButton watching={watchList} onClick={onWatch} />
        </p>
      </div>
    </div>
  );
};
