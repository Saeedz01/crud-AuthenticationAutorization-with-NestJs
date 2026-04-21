import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: any, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.validateUser(dto.email, dto.password);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const token = await this.authService.login(user);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return { message: 'Login successful' };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { message: 'Logged out' };
  }
}
