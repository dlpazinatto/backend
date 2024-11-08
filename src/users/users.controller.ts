import {
  Get,
  Post,
  Body,
  Controller,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (user) {
      return this.authService.login(user);
    }
    return {
      message: 'Invalid credentials',
    };
  }
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<UsersEntity[]> {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() user: UsersEntity): Promise<UsersEntity> {
    return this.usersService.create(user);
  }

  @Post('login')
  async authenticate(
    @Body() body: { email: string; password: string },
  ): Promise<{ message: string; user?: UsersEntity }> {
    const { email, password } = body;
    const user = await this.usersService.validateUser(email, password);
    if (user) {
      return {
        message: 'User authenticated',
        user,
      };
    } else {
      return {
        message: 'Invalid credentials',
      };
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.usersService.deleteUser(+id);
    return {
      message: `User with id ${id} deleted`,
    };
  }
}
