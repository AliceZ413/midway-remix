/**
 * 登录后存储访问上下文的状态数据
 */
export class UserContext {
  userId: string;
  username: string;

  constructor(userId: string, username: string) {
    this.userId = userId;
    this.username = username;
  }
}
