import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { Movie } from './entities/movie.entity'
import { MoviesService } from './movies.service'

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll()
  }

  @Get('search')
  search(@Query('year') year: string) {
    console.log(typeof year)

    return `We are searching for a movie made after : ${year}`
  }

  @Get(':id')
  getOne(@Param('id') movieId: string): Movie {
    return this.moviesService.getOne(movieId)
  }

  @Post()
  create(@Body() movieData) {
    return this.moviesService.create(movieData)
  }

  @Delete(':id')
  remove(@Param('id') movieId: string) {
    return this.moviesService.deleteOne(movieId)
  }

  // 일부분 수정할 때 사용됨
  @Patch(':id')
  patch(@Param('id') movieId: string) {
    return `This will patch one movie with the id : ${movieId}`
  }

  @Put(':id')
  put(@Param('id') movieId: string) {
    return `This will put one movie with the id : ${movieId}`
  }
}
