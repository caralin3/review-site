import { Content, Episode } from '../../common';

export const movie1: Content = {
  actors: ['Daniel Radcliffe', 'Emma Watson', 'Rupert Grint'],
  director: 'Chris Columbus',
  duration: 95,
  id: '1fb69fe3-ac0b-49ce-9daf-f3e774eb981f',
  image: '',
  genres: ['Family'],
  mpa: 'PG',
  rating: 4,
  synopsis:
    'As students are paralyzed, Harry and the gang must go to the chamber\
  of secrets to find the culprit.',
  title: 'Harry Potter and the Chamber of Secrets',
  watchList: false,
  year: 2002,
  type: 'Movie'
};

export const movie2: Content = {
  actors: [
    'Steve Martin',
    'Bonnie Hunt',
    'Tom Welling',
    'Hilary Duff',
    'Piper Perabo'
  ],
  director: 'Shawn Levy',
  duration: 120,
  id: '816697dc-345f-4d2f-9a3c-ce4a88de6f0d',
  image: '',
  genres: ['Comedy', 'Family'],
  mpa: 'PG',
  rating: 4,
  synopsis: 'A dozen children in one house.',
  title: 'Cheaper By the Dozen',
  watchList: true,
  year: 2001,
  type: 'Movie'
};

export const movie3: Content = {
  actors: ['Heather Locklear', 'Hilary Duff'],
  director: 'John Smith',
  duration: 102,
  id: '2aeb26b0-334e-43a4-bc39-0abb157d77f6',
  image: '',
  genres: ['Romance'],
  mpa: 'PG-13',
  rating: 3,
  synopsis: "She's looking for the perfect man.",
  title: 'The Perfect Man',
  watchList: false,
  year: 2003,
  type: 'Movie'
};

export const episode1: Episode = {
  id: 'b1c2094b-9e6a-43d7-8802-a25ee6bf32e8',
  date: '2015-06-03',
  duration: 22,
  num: 1,
  season: 1,
  synopsis: 'Liza pretends to be 26 to get a job.',
  title: 'Pilot'
};

export const episode2: Episode = {
  id: '0cc13a19-d04d-4ed3-9602-3345e2d579db',
  date: '2015-06-10',
  duration: 24,
  num: 2,
  season: 1,
  synopsis: 'Liza and Kelsey must land an author.',
  title: 'Millenial'
};

export const episode3: Episode = {
  id: 'd2f13170-a98c-48e3-9fa6-d4526152b80f',
  date: '2016-06-12',
  duration: 32,
  num: 1,
  season: 2,
  synopsis: "Josh know's Liza's secret.",
  title: 'The New Normal'
};

export const episodes = {
  episodes: [episode1, episode2, episode3],
  contentCount: 3
};

export const show1: Content = {
  actors: ['Sutton Foster', 'Hilary Duff', 'Miriam Shor', 'Peter Herman'],
  director: 'Dan',
  duration: 24,
  id: '444f885d-f4b5-4a06-8c5b-ae0e449c1ccd',
  image: '',
  genres: ['Comedy', 'Drama', 'Romance'],
  mpa: 'TV-14',
  myRating: 3,
  network: 'TV Land',
  rating: 5,
  synopsis:
    'A 40 year old pretends to be 26 to get back into the publishing world.\
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi \
    ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit \
    in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur \
    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt \
    mollit anim id est laborum.',
  title: 'Younger',
  watchList: true,
  year: 2015,
  type: 'Series'
};

export const content = {
  content: [movie1, show1, movie2, movie3],
  contentCount: 4
};
