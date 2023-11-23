import { Inject, Provide } from '@midwayjs/core';
import { UserService } from './user.service';
import { createHash } from 'crypto';
import { omit } from 'lodash';
import { LoginDto } from '../controller/dto/auth.dto';

@Provide()
export class AuthService {
  @Inject()
  private userService: UserService;

  async register() {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.getUser({ username: loginDto.username });
    const md5 = createHash('md5');
    if (user && user.password === md5.update(loginDto.password).digest().toString('hex')) {
      const result = omit(user, ['password']);
      return result;
    }
    return null;
  }
}
