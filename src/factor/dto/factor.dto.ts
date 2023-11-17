import { ApiProperty } from "@nestjs/swagger";

import {IsArray, IsString} from 'class-validator'

export class factorType {


    @IsString()
    @ApiProperty({
        type: 'string',
        required: true,
        description: 'price for login',
      })
    price?:string;
    
    @IsArray()
    @ApiProperty({
        type: [String],
        required: true,
        description: 'list of users',
        example: ['1', '2'],
      })
    users?:string[];
    
    
  @ApiProperty({ type: [String], example: ['product1', 'product2'], required:true, description:"bought products" })
  @IsArray()
  products?: string[];
  
   // Exclude password field from the response

    
  }