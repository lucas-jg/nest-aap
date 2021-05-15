import { Injectable, NotFoundException } from '@nestjs/common'
import { Movie } from './entities/movie.entity'

@Injectable()
export class MoviesService {
  private movies: Movie[] = []

  getAll(): Movie[] {
    return this.movies
  }

  getOne(id: string): Movie {
    // +id => 숫자로 된 문자열 앞에 + 붙이면 number됨
    const movie = this.movies.find(movie => movie.id === +id)
    if (!movie) {
      throw new NotFoundException(`Moive with ID ${id} not found.`)
    }
    return movie
  }

  deleteOne(id: string): boolean {
    this.getOne(id)
    this.movies = this.movies.filter(movie => movie.id !== +id)
    return true
  }

  create(movieData: Movie) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    })
  }

  update(id: string, updateData: Movie) {
    const movie = this.getOne(id)
    this.deleteOne(id)
    this.movies.push({ ...movie, ...updateData })
  }
}
