import { Injectable } from '@nestjs/common';
import {
  AuthResponse,
  signInDataType,
  signUpDataType,
} from './types/auth-service.types';
import { UserRepository } from '../user/user.repository';
import { ApplicationError } from '../../utils/application.error';
import { AUTH_ERRORS } from './constants/auth-errors.constant';
import { JwtService } from '@nestjs/jwt';
import { hashPassword, validatePassword } from './utils/password.util';
import { IUser } from '../user/types/user-repository.types';
import {
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_OPTIONS,
} from './constants/auth-cookie.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpData: signUpDataType): Promise<AuthResponse> {
    const user = await this.userRepository.findOneByData({
      username: signUpData.username,
    });
    if (user) {
      throw new ApplicationError(AUTH_ERRORS.USERNAME_EXISTS);
    }
    if (signUpData.password !== signUpData.confirmPassword) {
      throw new ApplicationError(AUTH_ERRORS.PASSWORDS_DO_NOT_MATCH);
    }
    const hashedPassword = await hashPassword(signUpData.password);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...createdUserData } = await this.userRepository.save({
      username: signUpData.username,
      password: hashedPassword,
    });
    return {
      user: createdUserData,
      authCookie: await this._getAuthCookie(createdUserData),
    };
  }

  async signIn(signInData: signInDataType): Promise<AuthResponse> {
    const { password, ...user } =
      await this.userRepository.findOneByWithPassword({
        username: signInData.username,
      });
    if (!user) {
      throw new ApplicationError(AUTH_ERRORS.BAD_CREDENTIALS);
    }
    const isPasswordValid = validatePassword(signInData.password, password);
    if (!isPasswordValid) {
      throw new ApplicationError(AUTH_ERRORS.BAD_CREDENTIALS);
    }

    return {
      user,
      authCookie: await this._getAuthCookie(user),
    };
  }

  private async _getAuthCookie(
    user: IUser,
  ): Promise<AuthResponse['authCookie']> {
    const accessToken = await this.jwtService.signAsync(user);

    return {
      name: AUTH_COOKIE_NAME,
      token: `Bearer ${accessToken}`,
      options: AUTH_COOKIE_OPTIONS,
    };
  }
}
