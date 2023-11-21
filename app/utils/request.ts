import { BASE_URL } from './constants';
import { stringify } from 'qs';

const formatPath = (path: string) => {
  if (path.startsWith('/')) {
    return path.substring(1, path.length);
  }
  return path;
};

export const get = async (path: string, data: { [key: string]: string } = {}) => {
  const token = localStorage.getItem('token');
  const queryString = stringify(data);
  return fetch(`${BASE_URL}/api/${formatPath(path)}?${queryString}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const post = async (path: string, data: { [key: string]: string } = {}) => {
  const token = localStorage.getItem('token');
  return fetch(`${BASE_URL}/api/${formatPath(path)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};
