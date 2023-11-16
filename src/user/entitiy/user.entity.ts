// src/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import {Exclude} from 'class-transformer'


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: false })
  bedehkar: boolean;
}
