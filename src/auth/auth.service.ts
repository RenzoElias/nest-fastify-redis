import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { hash, compare } from 'bcrypt';
import { DefaultResponse } from 'src/helper/response.helper';
import { JwtService } from '@nestjs/jwt';
import { IUserAuthDto, LoginAuthDto, RegisterAuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private jwtService: JwtService,
  ) {}

  async saveUserDataInRedis(
    userData: RegisterAuthDto,
  ): Promise<DefaultResponse> {
    const hashPass = await hash(userData.password, 10);

    userData = {
      ...userData,
      password: hashPass,
    };

    await this.cache.set(`user:${userData.email}`, JSON.stringify(userData), 0);
    return DefaultResponse.sendOk('Succesful', {
      name: userData.name,
      email: userData.email,
    });
  }

  async generateAuthentication(
    userData: LoginAuthDto,
  ): Promise<DefaultResponse> {
    const userInfo = await this.getUserDataFromRedis(userData.email);

    if (!userInfo) {
      throw new HttpException('USER_NOT_FOUND', 404);
    }

    const checkPassword = await compare(userData.password, userInfo.password);

    if (!checkPassword) {
      throw new HttpException('INVALID_PASSWORD', 401);
    }

    const payload: IUserAuthDto = {
      name: userInfo.name,
      email: userInfo.email,
      password: userInfo.password,
    };

    const token = this.jwtService.sign(payload);

    return DefaultResponse.sendOk('Succesful', { userData, token });
  }

  async getUserDataFromRedis(userEmail: string): Promise<IUserAuthDto> {
    const userData = await this.cache.get<string>(`user:${userEmail}`);
    if (!userData) {
      return null;
    }
    return JSON.parse(userData);
  }
}
