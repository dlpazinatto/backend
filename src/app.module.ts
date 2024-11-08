import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersEntity } from './users/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './users/users.controller';
import { BooksModule } from './books/books.module';
import { AppDataSource } from './data-source';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CreateFirstUserSeed } from './seeders/create-first-user.seed';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const dataSource = AppDataSource(configService);
        return dataSource.options;
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UsersEntity]),
    BooksModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, CreateFirstUserSeed],
})
export class AppModule {}
