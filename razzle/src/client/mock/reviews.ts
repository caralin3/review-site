import { Review } from '../../common';
import { author1, author2 } from './author';

export const reviewMovie1: Review = {
  author: author1,
  body: 'Great movie!',
  created: '2019-07-18T12:21:49.088Z',
  id: 'bac05506-45bf-40ec-9a3a-6b81e1a5ab99',
  rating: 5
};

export const review2Movie1: Review = {
  author: author2,
  body: 'It was ok',
  created: '2019-07-19T12:21:49.088Z',
  id: 'b07aa536-305a-4252-950e-2f125ca54167',
  rating: 4
};

export const reviewMovie2: Review = {
  author: author1,
  body: 'Love this movie!',
  created: '2019-07-19T12:21:49.088Z',
  id: '67bdd0ff-5127-4252-b8c1-2d812b2a8d9a',
  rating: 3
};

export const reviewMovie3: Review = {
  author: author2,
  body: 'Not a favorite. The plot was boring.',
  created: '2019-07-19T12:21:49.088Z',
  id: '4112132a-d6e5-4cdb-a92b-e60b3f232ee2',
  rating: 2
};

export const reviewShow1: Review = {
  author: author1,
  body: 'Such a great show! All of the actors are amazing!',
  created: '2019-07-19T12:21:49.088Z',
  id: 'e4d9ca2f-94af-4308-be65-c9659063ac77',
  rating: 5
};

export const reviews = [
  reviewMovie1,
  review2Movie1,
  reviewMovie2,
  reviewMovie3
];
