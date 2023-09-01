import {
  Controller,
  Get,
  Post,
  Request as Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { UserWithoutPassword } from '../user/user.controller';
import { JwtAuthGuard } from './jwt.guard';
import { JwtUser } from './jwt.strategy';
import { RefreshTokenGuard } from './jwtRefresh.guard';
import { RefreshTokenUser } from './jwtRefresh.strategy';
import { LocalAuthGuard } from './local.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user as UserWithoutPassword);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshAuthTokens(@Req() req: { user: RefreshTokenUser }) {
    return this.authService.refreshAuthTokens(
      req.user.userId,
      req.user.refreshToken,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Req() req: { user: JwtUser }) {
    return this.authService.logout(req.user.userId);
  }
}
