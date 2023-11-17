// src/user.controller.ts
import { Body, Controller, Get, Post, Res,NotFoundException, UnauthorizedException } from '@nestjs/common';
import { loginType } from './dto/user.dto';
import { UserService } from './user.service';
import {  Response } from 'express';

import {
  
  ApiConsumes, ApiTags,
} from '@nestjs/swagger';

@ApiTags('User Section')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiConsumes('application/x-www-form-urlencoded')
  @Post("login")
  async userLogin(@Body() loginData:loginType , @Res() res:Response ){
      const answer = await this.userService.loginUser(loginData)
      return res.status(200).json({
        statusCode:200,
        message:`Welcome ${loginData.username}!`,
        access_token : answer
        
      })
    
  }

  @Get("get")
  getUsers() {
    return this.userService.getUsers();
  }
}
