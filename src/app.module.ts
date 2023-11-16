import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { FactorController } from './factor/factor.controller';
import { FactorService } from './factor/factor.service';
import { FactorModule } from './factor/factor.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "151515",
    database: "bedehkar",
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true
  }
  ),
    UserModule,
    FactorModule,],
  controllers: [AppController, FactorController],
  providers: [AppService, FactorService],
})
export class AppModule {}
