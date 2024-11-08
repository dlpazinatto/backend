import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { Logger } from '@nestjs/common';

@Injectable()
export class CreateFirstUserSeed {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    private readonly usersService: UsersService,
  ) {}

  async run() {
    const userExists = await this.userRepository.findOne({
      where: { email: 'admin@admin.com' },
    });

    if (!userExists) {
      const user: UsersEntity = {
        id: null,
        name: 'Admin',
        email: 'admin@admin.com',
        password: 'admin',
      };
      await this.usersService.create(user);
      Logger.log('User created: ' + user.email, 'CreateFirstUserSeed');
    } else {
      Logger.log('User already exists', 'CreateFirstUserSeed');
    }
  }
}
