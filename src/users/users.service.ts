import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async findAll(): Promise<UsersEntity[]> {
    return this.usersRepository.find();
  }

  async create(user: UsersEntity): Promise<UsersEntity> {
    const userExists = await this.usersRepository.findOne({
      where: { email: user.email },
    });
    if (userExists) {
      throw new Error('User already exists');
    }
    const passwordHash = bcrypt.hashSync(user.password, 10);

    const newUser = this.usersRepository.create({
      ...user,
      password: passwordHash,
    });
    return this.usersRepository.save(newUser);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UsersEntity | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`User with id ${id} not found`);
    }
  }

  async findByEmail(email: string): Promise<UsersEntity | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<UsersEntity | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }
}
