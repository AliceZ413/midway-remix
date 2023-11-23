import { UserContext } from './common/user-context';

declare module '@midwayjs/core' {
  interface Context {
    userContext: UserContext;
  }
}

/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  username: string;
}

/**
 * @description Auth-Service parameters
 */
export interface ILoginOptions {
  username: string;
  password: string;
}
