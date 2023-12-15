import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CONFIG_REDIS } from 'src/common/config/config-redis';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/helper/strategies/jwt-auth.strategy';

@Module({
  imports: [
    CONFIG_REDIS(),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
