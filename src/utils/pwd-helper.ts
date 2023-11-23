import * as bcrypt from 'bcryptjs';

/**
 * 加密
 * @param {string} password
 */
export function encrypt(password: string) {
  const salt = bcrypt.genSaltSync(5);
  const hash = bcrypt.hashSync(password, salt);
  return '{bcrypt}' + hash;
}

/**
 * 解密
 * @param {string} password
 * @param {string} hash
 */
export function decrypt(password: string, hash: string) {
  if (hash.indexOf('{bcrypt}') === 0) {
    hash = hash.slice(8);
  }
  return bcrypt.compareSync(password, hash);
}
