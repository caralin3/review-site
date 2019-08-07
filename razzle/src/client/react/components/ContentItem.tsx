import React from 'react';
import {
  Content,
  MultipleEpisodesResponse,
  MultipleReviewsResponse,
  Review as ReviewType,
  NewReview,
  NewReviewRequest,
  User
} from '../../../common';
import {
  ContentDetails,
  EpisodeItem,
  Review,
  ReviewEditor
} from '../components';
import { Link } from 'react-router-dom';
import { routes } from '../routes';

export interface ContentItemProps {
  content: Content;
  episodes?: MultipleEpisodesResponse;
  handleRating: (value: number, id: string, rated: boolean) => void;
  handleCreateReview: (body: NewReviewRequest) => void;
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
  handleCreateReview,
  handleDeleteReview,
  handleRating,
  handleWatch,
  reviews,
  reviewsError,
  reviewsLoading,
  user
}) => {
  const [review, setReview] = React.useState<NewReview>({} as NewReview);
  const [errors, setErrors] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [submit, setSubmit] = React.useState(false);

  const reviewsList: ReviewType[] =
    reviews && reviews.reviews ? reviews.reviews : [];

  const reviewed = reviewsList.filter(
    rev => user && rev.author.username === user.username
  );

  const handleSubmit = async () => {
    setSubmit(true);
    if (!review.rating) {
      setErrors(['Rating required']);
      return;
    }
    if (review.body && review.rating) {
      setLoading(true);
      try {
        await handleCreateReview({ review });
        setSubmit(false);
      } catch (err) {
        console.error(err);
        if (err.response) {
          const apiErrors = err.response.data.errors;
          const formErrors: string[] = [];
          Object.keys(apiErrors).forEach(key => {
            if (apiErrors) {
              formErrors.push(`${key} ${apiErrors[key]}`);
            }
          });
          setErrors(formErrors);
        }
      }
    }
    setLoading(false);
  };

  const resetForm = () => {
    setErrors([]);
    setLoading(false);
    setSubmit(false);
  };

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
          {user && reviewed.length === 0 && (
            <ReviewEditor
              errors={errors}
              loading={loading}
              onChange={e => {
                setReview({ ...review, body: e.target.value });
                resetForm();
              }}
              onRate={val => {
                setReview({ ...review, rating: val });
                resetForm();
              }}
              onSubmit={handleSubmit}
              rating={review.rating}
              review={review.body}
              submit={submit}
              user={user}
            />
          )}
          {reviewsList &&
          !reviewsLoading &&
          !reviewsError &&
          reviewsList.length > 0 ? (
            <ul className="content-page__reviews-list">
              {reviewsList.map(rev => (
                <li className="content-page__reviews-item" key={rev.id}>
                  <Review
                    date={rev.created}
                    onRate={val => handleRating(val, content.id, true)}
                    onDelete={() => handleDeleteReview(rev.id)}
                    rating={rev.rating}
                    myRating={content.myRating}
                    review={rev.body}
                    user={user}
                    username={rev.author.username}
                  />
                </li>
              ))}
            </ul>
          ) : (
            !user && (
              <p>
                <Link className="cta content-page__link" to={routes.login.path}>
                  Login
                </Link>
                &nbsp; or &nbsp;
                <Link
                  className="cta content-page__link"
                  to={routes.register.path}
                >
                  register
                </Link>
                &nbsp; to create reviews
              </p>
            )
          )}
        </div>
      </section>
      {/* <section>
        <h2 className="content-page__header">Related</h2>
      </section> */}
    </div>
  );
};
