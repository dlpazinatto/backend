import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Email of the user' })
  @Column()
  name: string;

  @ApiProperty({ description: 'Password of the user' })
  @Column()
  email: string;

  @Column()
  password: string;
}
