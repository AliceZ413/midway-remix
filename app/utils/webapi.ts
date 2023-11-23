import { post } from './request';

export const login = async (username: string, password: string) => {
  return post('/auth/login', {
    username,
    password,
  });
};

export const logout = async () => {
  return post('/auth/logout');
};
