import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { factorType } from './dto/factor.dto';
import { FactorResponseDto } from './dto/factorResponse.dto';
import { Factor } from './entity/factor.entity';
import { FactorService } from './factor.service';
import {  Response } from 'express';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';



@ApiTags('Factor Section')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('factor')
export class FactorController {
    constructor (private readonly factorService:FactorService){}
    
    
    @Get("get")
    async getAll(@Res() res:Response) {
    
    
        const factors = await this.factorService.findAll();
    
        const result = factors.map(factor => this.factorService.mapToResponseDtoWithoutPassword(factor));
        return res.status(200).json({
            statusCode:200,
            message:result
        })
      }
    
    
    @Post("create")
    async create(@Body() factorDto: factorType,@Res() res:Response) {
      const result = await this.factorService.create(factorDto);
      return res.status(200).json({
        statusCode:200,
        message : "created Successfully!",
        data: this.factorService.mapToResponseDtoWithoutPassword(result)
      })
    }
    
    
  @Get(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOkResponse({ type: FactorResponseDto, description: 'Factor found successfully' })
  @ApiNotFoundResponse({ description: 'Factor not found' })
  async findOne(@Param('id', ParseIntPipe) id: number, @Res() res:Response) {

      const factor = await this.factorService.findOne(id);

      if (!factor) {
        throw new NotFoundException('Factor not found');
      }
      const result = this.factorService.mapToResponseDtoWithoutPassword(factor)
      return res.status(200).json({
        statusCode :200,
        message:result
        
      })
    
  }
  
  
  @Put('update:id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: factorType })
  @ApiOkResponse({ type: FactorResponseDto, description: 'Factor updated successfully' })
  @ApiNotFoundResponse({ description: 'Factor not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: factorType,
    @Res() res:Response
  ) {
      const updatedFactor = await this.factorService.update(id, updateData);
      if (!updatedFactor) {
        throw new Error('Factor not found');
      }
      const result = this.factorService.mapToResponseDtoWithoutPassword(updatedFactor);
      return res.status(200).json({
        statusCode:200,
        message:"updated Succesfully!",
        data: result
      })
    
  }
  
  
  
  @Delete(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOkResponse({ type: FactorResponseDto, description: 'Factor deleted successfully' })
  @ApiNotFoundResponse({ description: 'Factor not found' })
  async deleteOne(@Param('id', ParseIntPipe) id: number, @Res() res:Response) {
    try {
      const deletedFactor = await this.factorService.factorDelete(id);

      if (!deletedFactor) {
        // Return a 404 response if the factor is not found
        throw new Error('Factor not found');
      }

      // Map the deleted factor to the response DTO
      const result = this.factorService.mapToResponseDtoWithoutPassword(deletedFactor);
      return res.status(200).json({
        statusCode: 200,
        message :"Deleted Succesfully!",
      
      })
    } catch (error) {
      console.error('Error while processing deleteOne:', error);
      throw new Error('Internal server error');
    }
  }
}
