import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { factorType } from './dto/factor.dto';
import { FactorResponseDto } from './dto/factorResponse.dto';
import { Factor } from './entity/factor.entity';
import { FactorService } from './factor.service';
import {  Response } from 'express';



@ApiTags('Factor Section')
@Controller('factor')
export class FactorController {
    constructor (private readonly factorService:FactorService){}
    
    
    @Get()
    async getAll(@Res() res:Response) {
    
    
        const factors = await this.factorService.findAll();
    
        const result = factors.map(factor => this.factorService.mapToResponseDtoWithoutPassword(factor));
        return res.status(200).json({
            statusCode:200,
            message:result
        })
      }
    
    
    @Post()
    async create(@Body() factorDto: factorType,@Res() res:Response) {
      const result = await this.factorService.create(factorDto);
      return res.status(200).json({
        statusCode:200,
        message: this.factorService.mapToResponseDtoWithoutPassword(result)
      })
    }
    
}
