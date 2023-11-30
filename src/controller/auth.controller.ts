import { Body, Controller, Get, Inject, Post } from '@midwayjs/core';
import { LoginDto } from '../model/dto/auth.dto';
import { AuthService } from '../service/auth.service';
import { Context } from '@midwayjs/koa';
import { LoginVO } from '../model/vo/auth.vo';
import { UnauthorizedError } from '@midwayjs/core/dist/error/http';
import { UserContext } from '../common/user-context';
import { Protected } from '../decorator/protected';

@Controller('/api/auth')
export class AuthController {
  @Inject()
  private readonly ctx: Context;

  @Inject()
  private authService: AuthService;

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<LoginVO> {
    const user = await this.authService.login(loginDto);

    if (!user) {
      throw new UnauthorizedError('用户名或密码错误');
    }

    const userContext = new UserContext(user.id, user.username);
    this.ctx.session.userContext = userContext;

    const vo = new LoginVO();
    vo.user_info = {
      userId: user.id,
      username: user.username,
    };

    return vo;
  }

  @Get('/jwtProtected')
  @Protected()
  async jwtProfile() {
    return {};
  }

  @Post('/logout')
  async logout() {
    this.ctx.session = null;
    return {};
  }
}
