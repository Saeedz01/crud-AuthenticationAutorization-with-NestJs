import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { CommonModule } from '../common/common.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, CommonModule,
    // JwtModule can be imported in any module because it only trigger when app starts
    // and it set the secret and options globally, 
    // but better to keep it in auth module for better organization and maintainability
    JwtModule.register({
        secret: 'JWT_SECRET_KEY',
        signOptions: { expiresIn: '1h' },
      })
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
