// src/user.entity.ts
import { User } from 'src/user/entitiy/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, CreateDateColumn } from 'typeorm';
import {ApiProperty} from '@nestjs/swagger'
import { Exclude, Transform } from 'class-transformer';

@Entity()
export class Factor {

  @PrimaryGeneratedColumn()
  id: number;


  @Column({type:'text', nullable: true})
  price: string;
  
  @Column({ type: 'simple-array', nullable: true }) // Use 'simple-array' for an array of strings
  @ApiProperty({ type: [String], example: ['product1', 'product2'] })
  products: string[];
  
  @ManyToMany(()=> User)
  @JoinTable()
  users: User[];
  
  @CreateDateColumn({type: 'timestamp', default : () => 'CURRENT_TIMESTAMP'})
  createdAt: string;
  
    
}
