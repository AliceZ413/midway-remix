import { Inject, Provide } from '@midwayjs/core';
import { UserService } from './user.service';
import { createHash } from 'crypto';
import { omit } from 'lodash';
import { LoginDto } from '../dto/auth.dto';
import { JwtService } from '@midwayjs/jwt';

@Provide()
export class AuthService {
  @Inject()
  private userService: UserService;

  @Inject()
  private jwtService: JwtService;

  async login(loginDto: LoginDto) {
    const user = await this.userService.getUser({ username: loginDto.username });
    const md5 = createHash('md5');
    if (user && user.password === md5.update(loginDto.password).digest().toString('hex')) {
      const result = omit(user, ['password']);
      return result;
    }
    return null;
  }

  async signToken(payload: any) {
    const token = await this.jwtService.sign(payload);
    return token;
  }
}
