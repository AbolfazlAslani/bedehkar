// src/factor/dto/factor-response.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { loginType } from '../../user/dto/user.dto';

export class FactorResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty()
  price: string;

  @ApiProperty({ type: [loginType], description: 'List of user IDs' })
  @Exclude()
  users: loginType[];

  @ApiProperty({ type: [String], example: ['product1', 'product2'] })
  products: string[];

  @ApiProperty({ example: '2023-11-16T22:59:45.122Z' })
  createdAt: string;
  
}
