import { Body, Controller, Get, Inject, Post } from '@midwayjs/core';
import { LoginDto } from './dto/auth.dto';
import { AuthService } from '../service/auth.service';
import { UnauthorizedError } from '@midwayjs/core/dist/error/http';
import { Context } from '@midwayjs/koa';
import { LoginVO } from './vo/auth.vo';

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
    this.ctx.session.user = {
      userId: user.id,
      username: user.username,
    };
    return {
      user_info: {
        userId: user.id,
        username: user.username,
      },
    };
  }

  @Get('/jwtProtected')
  async jwtProfile() {
    return {};
  }

  @Post('/logout')
  async logout() {
    this.ctx.session = null;
    return {};
  }
}
