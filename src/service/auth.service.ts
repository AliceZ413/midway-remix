import { Inject, Provide } from '@midwayjs/core';
import { UserService } from './user.service';
import { LoginDto } from '../controller/dto/auth.dto';
import { decrypt } from '../utils/pwd-helper';

@Provide()
export class AuthService {
  @Inject()
  private userService: UserService;

  async register() {
    const user = await this.userService.createUser();
    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.getUser({ username: loginDto.username });
    const flag = decrypt(loginDto.password, user.password);
    if (!flag) {
      return null;
    }
    return user;
  }
}
