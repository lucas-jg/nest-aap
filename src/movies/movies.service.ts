import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateMovieDto } from './dto/create-movie.dto'
import { Movie } from './entities/movie.entity'

@Injectable()
export class MoviesService {
  private movies: Movie[] = []

  getAll(): Movie[] {
    return this.movies
  }

  getOne(id: number): Movie {
    // +id => 숫자로 된 문자열 앞에 + 붙이면 number됨
    const movie = this.movies.find(movie => movie.id === id)
    if (!movie) {
      throw new NotFoundException(`Moive with ID ${id} not found.`)
    }
    return movie
  }

  deleteOne(id: number): boolean {
    this.getOne(id)
    this.movies = this.movies.filter(movie => movie.id !== id)
    return true
  }

  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    })
  }

  update(id: number, updateData: Movie) {
    const movie = this.getOne(id)
    this.deleteOne(id)
    this.movies.push({ ...movie, ...updateData })
  }
}
