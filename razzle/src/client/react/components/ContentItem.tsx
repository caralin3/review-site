import React from 'react';
import {
  Content,
  MultipleEpisodesResponse,
  MultipleReviewsResponse,
  Review as ReviewType,
  User
} from '../../../common';
import {
  ContentDetails,
  EpisodeItem,
  Review,
  ReviewEditor
} from '../components';

export interface ContentItemProps {
  content: Content;
  episodes?: MultipleEpisodesResponse;
  handleRating: (value: number, id: string, rated: boolean) => void;
  handleDeleteReview: (id: string) => void;
  handleWatch: (watching: boolean, id: string) => void;
  reviews?: MultipleReviewsResponse;
  reviewsError?: Error;
  reviewsLoading: boolean;
  user?: User;
}

export const ContentItem: React.FC<ContentItemProps> = ({
  content,
  episodes,
  handleDeleteReview,
  handleRating,
  handleWatch,
  reviews,
  reviewsError,
  reviewsLoading,
  user
}) => {
  const reviewsList: ReviewType[] =
    reviews && reviews.reviews ? reviews.reviews : [];

  return (
    <div className="content-page">
      <section>
        <ContentDetails
          content={content}
          onRate={(val, rated) => handleRating(val, content.id, rated)}
          onWatch={() => handleWatch(content.watchList, content.id)}
          user={user}
        />
      </section>
      {episodes && (
        <section>
          <h2 className="content-page__header">Episodes</h2>
          <ul className="episode-item__list">
            {episodes.episodes.length > 0 &&
              episodes.episodes.map(ep => (
                <li className="episode-item__list-item" key={ep.id}>
                  <EpisodeItem episode={ep} />
                </li>
              ))}
          </ul>
        </section>
      )}
      <section>
        <h2 className="content-page__header">Reviews</h2>
        <div className="content-page__reviews">
          {user && (
            // @TODO: Replace with correct props
            <ReviewEditor
              errors={[]}
              loading={false}
              onChange={() => null}
              onRate={val => null}
              onSubmit={() => null}
              rating={0}
              review=""
              submit={false}
              user={user}
            />
          )}
          {reviewsList &&
            !reviewsLoading &&
            !reviewsError &&
            reviewsList.length > 0 && (
              <ul className="content-page__reviews-list">
                {reviewsList.map(review => (
                  <li className="content-page__reviews-item">
                    <Review
                      date={review.created}
                      onDelete={() => handleDeleteReview(review.id)}
                      rating={review.rating}
                      review={review.body}
                      user={user}
                      username={review.author.username}
                    />
                  </li>
                ))}
              </ul>
            )}
        </div>
      </section>
      {/* <section>
        <h2 className="content-page__header">Related</h2>
      </section> */}
    </div>
  );
};
