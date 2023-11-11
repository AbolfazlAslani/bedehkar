// src/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: false })
  bedehkar: boolean;
}
