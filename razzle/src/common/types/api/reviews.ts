import { Review } from '..';

export interface SingleReviewResponse {
  review: Review;
}

export interface MultipleReviewsResponse {
  reviews: Review[];
  count: number;
}

// Returns SingleReviewResponse
export interface NewReview {
  body: string;
  rating: number;
}

export interface NewReviewRequest {
  review: NewReview;
}

export interface UpdateReview {
  body?: string;
  rating?: number;
}

// Returns SingleReviewResponse
export interface UpdateReviewRequest {
  review: UpdateReview;
}
