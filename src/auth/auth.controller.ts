/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() user: User): Promise<User> {
    return this.authService.createUser(
      user.email,
      user.password,
      user.username,
      user.name,
    );
  }

  @Post('validate-email')
  async validateUser(@Body() user: User): Promise<boolean> {
    return this.authService.validateUserNotExists(user.email);
  }

  @Post('login')
  async login(@Body() user: User): Promise<{ access_token: string }> {
      const validatedUser = await this.authService.validateUser(
        user.email,
        user.password,
      );
      if (validatedUser) {
        return this.authService.login(validatedUser);
      }
      throw new UnauthorizedException('Email and/or password incorrect');
    
  }

  @Get('private')
  @UseGuards(JwtAuthGuard)
  getProtectedData() {
    // Logic to return protected data
    return 'Protected data';
  }
}
