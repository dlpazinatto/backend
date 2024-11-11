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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiHeader,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved books.' })
  @ApiResponse({ status: 400, description: 'Invalid query parameters.' })
  @ApiBearerAuth()
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT Authorization header. Exemplo: Bearer <JWT token>',
    required: true,
  })
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
  @ApiOperation({ summary: 'Get book by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the book' }) // Documentação para o parâmetro 'id'
  @ApiResponse({ status: 200, description: 'Successfully retrieved the book.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  getBookById(@Param('id') id: number): Promise<Books> {
    return this.booksService.getBookById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiBody({ type: Books, description: 'Book data' }) // Exemplo de como documentar o corpo da requisição
  @ApiResponse({ status: 201, description: 'Successfully created the book.' })
  @ApiResponse({ status: 400, description: 'Invalid data provided.' })
  createBook(@Body() bookData: Partial<Books>): Promise<Books> {
    return this.booksService.createBook(bookData);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update an existing book' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the book to update',
  })
  @ApiBody({ type: Books, description: 'Updated book data' })
  @ApiResponse({ status: 200, description: 'Successfully updated the book.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  updateBook(
    @Param('id') id: number,
    @Body() updateData: Partial<Books>,
  ): Promise<Books> {
    return this.booksService.updateBook(id, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID of the book to delete',
  })
  @ApiResponse({ status: 200, description: 'Successfully deleted the book.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  deleteBook(@Param('id') id: number): Promise<void> {
    return this.booksService.deleteBook(id);
  }
}
