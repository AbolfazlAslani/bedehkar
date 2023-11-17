import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entitiy/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { factorType } from './dto/factor.dto';
import { FactorResponseDto } from './dto/factorResponse.dto';
import { Factor } from './entity/factor.entity';

@Injectable()
export class FactorService {
    constructor(
    
    @InjectRepository(Factor)
    private readonly factorRepository: Repository<Factor>,
    private readonly userService:UserService
    ){}
    
    async findAll(): Promise<Factor[]> {
    
        return this.factorRepository.find({relations : ['users']});
    } 
    
    async findOne(id: number): Promise<Factor> {
        const factor = await this.factorRepository.findOne({where: {id}, relations : ['users']});
      
        if (!factor) {
          throw new NotFoundException(`Factor with ID ${id} not found`);
        }
        return factor;
      }
      
    async create(factorData: factorType ): Promise<Factor>{
    
        const {price, users, products} = factorData;
        const factor = this.factorRepository.create({price, products})
        
        if (users){
            factor.users = await this.userService.findUsersByIds(users)
            if (users.length != factor.users.length){
                throw new NotFoundException("Not Found User Id's or Duplicate ID Entered !")
            }
        }
        return this.factorRepository.save(factor);
        
    }
    
    async update(id: number, factorData: factorType): Promise<Factor>{
        const factor = await this.findOne(id);
        
        const {price, users, products} = factorData;      
        const findUsers = await this.userService.findUsersByIds(users)
        if (users){
            factor.users = findUsers;
        }
        factor.products = products;
        factor.price = price;
        
        return this.factorRepository.save(factor)
        
    }
    async factorDelete(id:number): Promise<Factor | undefined>{
      const factor = await this.findOne(id)

      if (!factor) {
        return undefined; // Factor not found
      }
    
      // Delete the factor from the database
      await this.factorRepository.remove(factor);
    
      return factor;
        
    }
    
    mapToResponseDto(factor: Factor): FactorResponseDto {
        const responseDto = new FactorResponseDto();
        responseDto.id = factor.id;
        responseDto.price = factor.price;
        responseDto.users = factor.users.map((user) => ({
          id: user.id,
          username: user.username,
          bedehkar: user.bedehkar,
        }));
        responseDto.products = factor.products;
        responseDto.createdAt = factor.createdAt;
    
        return responseDto;
      }
      
      mapToResponseDtoWithoutPassword(factor: Factor): FactorResponseDto {
        const responseDto = this.mapToResponseDto(factor);
    
        // Manually remove the password property from each user
        responseDto.users.forEach((user) => {
          delete user.password;
        });
    
        return responseDto;
      }
    
   
      
    
    
    
}
