import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1122',
      database: 'user',
      autoLoadEntities: true,
      synchronize: true, // dev only
    }),
    UsersModule,
    AuthModule,
    CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
