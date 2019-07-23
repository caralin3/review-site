import React from 'react';
import { Content, User } from '../../../common';
import { ContentPreview } from '.';

export interface ContentPreviewListProps {
  contentList: Content[];
  handleRating: (value: number, id: string) => void;
  handleWatch: (watching: boolean) => void;
  user?: User;
}

export const ContentPreviewList: React.FC<ContentPreviewListProps> = ({
  contentList,
  handleRating,
  handleWatch,
  user
}) => (
  <ul className="content__list">
    {contentList.map(content => (
      <li className="content__item" key={content.id}>
        <ContentPreview
          content={content}
          onRate={val => handleRating(val, content.id)}
          onWatch={() => handleWatch(content.watchList)}
          user={user}
        />
      </li>
    ))}
  </ul>
);
