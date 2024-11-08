import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Books } from './books.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllBooks(
    @Query('name') name = '',
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<{ books: Books[]; total: number }> {
    const [books, total] = await this.booksService.getBooksPaginated(
      name,
      page,
      limit,
    );
    return { books, total };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getBookById(@Param('id') id: number): Promise<Books> {
    return this.booksService.getBookById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createBook(@Body() bookData: Partial<Books>): Promise<Books> {
    return this.booksService.createBook(bookData);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateBook(
    @Param('id') id: number,
    @Body() updateData: Partial<Books>,
  ): Promise<Books> {
    return this.booksService.updateBook(id, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteBook(@Param('id') id: number): Promise<void> {
    return this.booksService.deleteBook(id);
  }
}
