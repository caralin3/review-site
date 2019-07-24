import { User, UserRole } from '../common';
import { User as DbUser } from './database';

export const formatUser = (user: DbUser, token: string): User => ({
  token,
  bio: user.bio,
  email: user.email,
  image: user.image,
  role: user.role as UserRole,
  username: user.username
});
