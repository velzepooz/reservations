import {
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AUTH_ROUTES } from './constants/auth-routes.constant';
import { SignUpDto } from './dto/in/sign-up.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { FastifyReply } from 'fastify';
import { UserDto } from '../user/dto/out/user.dto';
import { SignInDto } from './dto/in/sign-in.dto';
import { AuthResponse } from './types/auth-service.types';

@ApiTags('Auth')
@UsePipes(new ValidationPipe())
@Controller(AUTH_ROUTES.MAIN)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({ type: UserDto, description: 'User data' })
  @ApiBadRequestResponse({ description: 'Invalid body params' })
  @Post(AUTH_ROUTES.SIGN_UP)
  async signUp(
    @Body() signUpData: SignUpDto,
    @Res() reply: FastifyReply,
  ): Promise<void> {
    const authResponse = await this.authService.signUp(signUpData);
    this._authorizeCookie(reply, authResponse);
  }

  @ApiCreatedResponse({ type: UserDto, description: 'User data' })
  @ApiBadRequestResponse({ description: 'Invalid body params' })
  @Post(AUTH_ROUTES.SIGN_IN)
  async signIn(
    @Body() signInData: SignInDto,
    @Res() reply: FastifyReply,
  ): Promise<void> {
    const authResponse = await this.authService.signIn(signInData);
    this._authorizeCookie(reply, authResponse);
  }

  private _authorizeCookie(reply: FastifyReply, authData: AuthResponse): void {
    reply.setCookie(
      authData.authCookie.name,
      authData.authCookie.token,
      authData.authCookie.options,
    );
    reply.send(authData.user);
  }
}
