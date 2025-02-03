import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import authConfig from './config/auth.config';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('auth.secret'),
        signOptions: {
          expiresIn: configService.get<string>('auth.accessExpiration'),
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forFeature(authConfig),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
