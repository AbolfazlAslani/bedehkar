// src/user.service.ts
import { Injectable,UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { loginType } from './dto/user.dto';
import { User } from './entitiy/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,

  ) {}
    
    async loginUser(loginData:loginType){
        const findUser = await this.findUser(loginData.username);
        if (findUser === null){
           throw new UnauthorizedException("Access Denied !")
        }
        if (loginData.password !== findUser.password){
           throw new UnauthorizedException("Access Denied !")
        }
        
        const payload = {username: loginData.username}
        const access_token = await this.jwtService.sign(payload,{
            secret: "@brB3ko0hI5H3r3"
        })
      
      return access_token
      
    }   
    
    
    async findUser(username: string){
        return this.userRepository.findOne({where : {username}})
    }
        
  getUsers(): Promise<User[]> {
    return this.userRepository.find(
      {
        select: ["id","username", "bedehkar"]
      }
    );
  }
  
  async findUsersByIds(userIds: string[]): Promise<User[]> {
    return this.userRepository.findByIds(userIds);
  }
}
