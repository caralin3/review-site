import classNames from 'classnames';
import React from 'react';
import { User } from '../../../common';

export interface StarRatingProps {
  myRating?: number;
  onClick?: (rating: number) => void;
  rating: number;
  user?: User;
}

export const StarRating: React.FC<StarRatingProps> = ({
  myRating,
  onClick,
  rating,
  user
}) => {
  const [hovering, setHovering] = React.useState<number>(-1);

  const stars = () => {
    const stars: number[] = [];
    for (let i = 0; i < 5; i += 1) {
      stars.push(i);
    }
    return stars;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>, star: number) => {
    if (user) {
      if (e.keyCode === 9) {
        if (e.shiftKey) {
          setHovering(star - 2);
        } else {
          setHovering(star - 1);
        }
      }

      if (e.keyCode === 13 && onClick) {
        onClick(star);
      }
    }
  };

  return (
    <div className="stars">
      {stars().map(star => (
        <i
          className={classNames('fas fa-star', {
            'stars--hovering':
              user && onClick && hovering > -1 && hovering >= star,
            'stars--active': !myRating && rating > 0 && star < rating,
            'stars--fill': myRating && myRating > 0 && star < myRating,
            'stars--enabled': !!onClick,
            'stars--disabled': !onClick
          })}
          key={star}
          tabIndex={onClick ? 0 : -1}
          onMouseEnter={() => {
            if (user) setHovering(star);
          }}
          onMouseLeave={() => {
            if (user) setHovering(-1);
          }}
          onKeyDown={e => handleKeyDown(e, star + 1)}
          onClick={user && onClick ? () => onClick(star + 1) : () => null}
        />
      ))}
    </div>
  );
};
