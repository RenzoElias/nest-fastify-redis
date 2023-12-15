import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DefaultResponse } from 'src/helper/response.helper';
import { ApiTags } from '@nestjs/swagger';
import { LoginAuthDto, RegisterAuthDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async registerUser(
    @Body() payload: RegisterAuthDto,
  ): Promise<DefaultResponse> {
    return await this.authService.saveUserDataInRedis(payload);
  }

  @Post('/login')
  async loginUser(@Body() payload: LoginAuthDto): Promise<DefaultResponse> {
    return await this.authService.generateAuthentication(payload);
  }
}
