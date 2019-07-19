import classNames from 'classnames';
import React from 'react';

export interface StarRatingProps {
  myRating?: number;
  onClick: (rating: number) => void;
  rating: number;
}

export const StarRating: React.FC<StarRatingProps> = ({
  myRating,
  onClick,
  rating
}) => {
  const [hovering, setHovering] = React.useState<number>(-1);

  const stars = () => {
    const stars: number[] = [];
    for (let i = 0; i < 5; i += 1) {
      stars.push(i);
    }
    return stars;
  };

  return (
    <div className="stars">
      {stars().map(star => (
        <i
          className={classNames('fas fa-star', {
            'stars--hovering': hovering > -1 && hovering >= star,
            'stars--active': !myRating && rating > 0 && star < rating,
            'stars--fill': myRating && myRating > 0 && star < myRating
          })}
          key={star}
          onMouseEnter={() => setHovering(star)}
          onMouseLeave={() => setHovering(-1)}
          onClick={() => onClick(star)}
        />
      ))}
    </div>
  );
};
