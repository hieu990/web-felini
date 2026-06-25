import { Controller, Get, Post, Body, HttpCode, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('auth/login')
  @HttpCode(200)
  login(@Body() body: { password?: string }) {
    console.log('[DEBUG] Backend login request body received:', body);
    if (body && typeof body.password === 'string' && body.password.trim() === 'fellini2026') {
      return {
        success: true,
        token: 'fellini-admin-session-token-2026',
      };
    }
    throw new UnauthorizedException('Mật khẩu đăng nhập không chính xác.');
  }
}

