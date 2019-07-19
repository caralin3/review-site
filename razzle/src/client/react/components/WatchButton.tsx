import React from 'react';
import { Button } from '.';

export interface WatchButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  watching: boolean;
}

export const WatchButton: React.FC<WatchButtonProps> = ({
  onClick,
  watching
}) => (
  <Button size="sm" onClick={onClick} fill={watching}>
    <span className="show-small">
      {watching ? (
        <span>
          <i className="fas fa-minus" />
          &nbsp;&nbsp;Unwatch{' '}
        </span>
      ) : (
        <span>
          <i className="fas fa-plus" />
          &nbsp;&nbsp;Watch{' '}
        </span>
      )}
    </span>
    <span className="show-medium">
      {watching ? (
        <span>
          <i className="fas fa-minus" />
          &nbsp;&nbsp;Remove from Watch List{' '}
        </span>
      ) : (
        <span>
          <i className="fas fa-plus" />
          &nbsp;&nbsp;Add to Watch List{' '}
        </span>
      )}
    </span>
  </Button>
);
