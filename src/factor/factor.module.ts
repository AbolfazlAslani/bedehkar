import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { Factor } from './entity/factor.entity';
import { FactorService } from './factor.service';

@Module({
    imports: [TypeOrmModule.forFeature([Factor]),
        UserModule
        ],
    providers:[FactorService,UserService,JwtService],
    
    exports:[TypeOrmModule],

})
export class FactorModule {}
