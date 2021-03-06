import moment from 'moment';
import React from 'react';
import { User } from '../../../common';
import { StarRating } from '.';
import { Link } from 'react-router-dom';
import { routes } from '../routes';

export interface ReviewProps {
  date: string;
  onDelete: () => void;
  onRate: (star: number) => void;
  myRating?: number;
  rating: number;
  review: string;
  user?: User;
  username: string;
}

export const Review: React.FC<ReviewProps> = ({
  date,
  onDelete,
  onRate,
  myRating,
  rating,
  review,
  user,
  username
}) => (
  <div className="review">
    <p className="review__body">{review}</p>
    <div className="review__footer">
      <p>
        <Link
          to={`${routes.profile.path}/${username}`}
          className="review__footer-username"
        >
          {username}
        </Link>
        &nbsp;
        {moment(date).format('MMM DD YYYY')}
      </p>
      <span className="review__footer">
        <StarRating
          rating={rating}
          myRating={user && user.username === username ? myRating : undefined}
          user={user}
          onClick={user && user.username === username ? onRate : undefined}
        />
        {user && user.username === username && (
          <i
            className="far fa-trash-alt review__footer-delete"
            onClick={onDelete}
            tabIndex={0}
          />
        )}
      </span>
    </div>
  </div>
);
