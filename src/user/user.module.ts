// src/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entitiy/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FactorModule } from 'src/factor/factor.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';



@Module({
  imports: [TypeOrmModule.forFeature([User]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
  
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      secret: configService.get('@brB3ko0hI5H3r3'),
      signOptions: {
        expiresIn: 3600,
      },
    }),
  }),
  
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports : [TypeOrmModule,UserService, JwtModule, PassportModule]
})
export class UserModule {}
