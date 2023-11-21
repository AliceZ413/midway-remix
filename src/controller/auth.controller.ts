import { Body, Controller, Get, Inject, Post } from '@midwayjs/core';
import { LoginDto } from '../dto/auth.dto';
import { AuthService } from '../service/auth.service';
import { UnauthorizedError } from '@midwayjs/core/dist/error/http';
import { JwtPassportMiddleware } from '../middleware/jwt.midlleware';
import { Context } from '@midwayjs/koa';

@Controller('/api/auth')
export class AuthController {
  @Inject()
  private readonly ctx: Context;

  @Inject()
  private authService: AuthService;

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.login(loginDto);
    if (!user) {
      throw new UnauthorizedError();
    }
    this.ctx.session.user = user;
    return {
      success: true,
      user_info: {
        id: user.id,
        username: user.username,
      },
    };
  }

  @Get('/jwtProtected', { middleware: [JwtPassportMiddleware] })
  async jwtProfile() {
    return {};
  }
}
