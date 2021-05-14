import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'All Movies';
  }

  @Get('/:id')
  getOne(@Param('id') movieId: string) {
    return `This will return one movie with the id : ${movieId}`;
  }

  @Post()
  create() {
    return 'This will create a movie';
  }

  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return `This will remove one movie with the id : ${movieId}`;
  }

  // 일부분 수정할 때 사용됨
  @Patch('/:id')
  patch(@Param('id') movieId: string) {
    return `This will patch one movie with the id : ${movieId}`;
  }

  @Put('/:id')
  put(@Param('id') movieId: string) {
    return `This will put one movie with the id : ${movieId}`;
  }
}