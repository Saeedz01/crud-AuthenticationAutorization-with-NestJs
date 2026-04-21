import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from './guards/roles.guard';

@Module({
    imports:[
    JwtModule.register({
    secret: 'JWT_SECRET_KEY',
    signOptions: { expiresIn: '1h' },
  })
    ],
    providers: [RolesGuard],
    exports: [RolesGuard, JwtModule]
})
export class CommonModule {
}
