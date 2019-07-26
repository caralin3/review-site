import React from 'react';
import { Content, User } from '../../../common';
import { ContentPreview } from '.';

export interface ContentPreviewListProps {
  contentList: Content[];
  handleRating: (star: number, id: string, rated: boolean) => void;
  handleWatch: (watching: boolean, id: string) => void;
  user?: User;
}

export const ContentPreviewList: React.FC<ContentPreviewListProps> = ({
  contentList,
  handleRating,
  handleWatch,
  user
}) => (
  <ul className="content__list">
    {contentList.length > 0 ? (
      contentList.map(content => (
        <li className="content__item" key={content.id}>
          <ContentPreview
            content={content}
            onRate={(val, rated) => handleRating(val, content.id, rated)}
            onWatch={() => handleWatch(content.watchList, content.id)}
            user={user}
          />
        </li>
      ))
    ) : (
      <li className="content__item">No items to show</li>
    )}
  </ul>
);
