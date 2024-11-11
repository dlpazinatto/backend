import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Books {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Book Title' })
  @Column()
  title: string;

  @ApiProperty({ description: 'Author name' })
  @Column()
  author: string;

  @ApiProperty({ description: 'Date of publication' })
  @Column()
  publishedDate: Date;
}
