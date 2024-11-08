import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { Books } from './books.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Books)
    private booksRepository: Repository<Books>,
  ) {}

  async createBook(bookData: Partial<Books>): Promise<Books> {
    const books = this.booksRepository.create(bookData);
    return await this.booksRepository.save(books);
  }

  async getBooks(): Promise<Books[]> {
    return await this.booksRepository.find();
  }

  async getBooksPaginated(
    name: string = '',
    page: number,
    limit: number,
  ): Promise<[Books[], number]> {
    const skip = (page - 1) * limit;
    const whereCondition: FindOptionsWhere<Books> =
      name && name.trim() !== '' ? { title: Like(`%${name}%`) } : {};
    const [books, total] = await this.booksRepository.findAndCount({
      where: whereCondition as any,
      skip,
      take: limit,
    });

    if (!books.length) {
      throw new NotFoundException('No books found');
    }

    return [books, total];
  }

  async getBookById(id: number): Promise<Books> {
    const book = await this.booksRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async updateBook(id: number, updateData: Partial<Books>): Promise<Books> {
    await this.booksRepository.update(id, updateData);
    return this.getBookById(id);
  }

  async deleteBook(id: number): Promise<void> {
    await this.booksRepository.delete(id);
  }
}
