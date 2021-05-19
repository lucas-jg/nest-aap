import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { MoviesService } from './movies.service'

const CREATE_MOVIE_DATA = {
  title: 'Test Movie',
  genres: ['test'],
  year: 2000,
}

describe('MoviesService', () => {
  let service: MoviesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile()

    service = module.get<MoviesService>(MoviesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll()
      expect(result).toBeInstanceOf(Array)
    })
  })

  describe('getOne', () => {
    it('should return a moive', () => {
      service.create(CREATE_MOVIE_DATA)
      const movie = service.getOne(1)
      expect(movie).toBeDefined()
      expect(movie.id).toEqual(1)
      expect(movie.title).toEqual('Test Movie')
    })
    it('should throw 404 error', () => {
      try {
        service.create(CREATE_MOVIE_DATA)
        const movie = service.getOne(2)
        expect(movie).toEqual(undefined)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('deleteOne', () => {
    it('deletes a moive', () => {
      service.create(CREATE_MOVIE_DATA)
      const beforeDeleteLength = service.getAll().length
      service.deleteOne(1)
      const afterDeleteLength = service.getAll().length

      expect(afterDeleteLength).toBeLessThan(beforeDeleteLength)
    })

    it('should throw 404 error', () => {
      try {
        service.create(CREATE_MOVIE_DATA)
        const movie = service.deleteOne(2)
        expect(movie).toEqual(undefined)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('create', () => {
    it('should create a moive', () => {
      const beforeCreateLength = service.getAll().length
      service.create(CREATE_MOVIE_DATA)
      const afterCreateLength = service.getAll().length
      expect(afterCreateLength).toBeGreaterThan(beforeCreateLength)
    })
  })

  describe('update', () => {
    it('should update a movie', () => {
      service.create(CREATE_MOVIE_DATA)
      const title = 'Updated Test'
      service.update(1, { title })
      const movie = service.getOne(1)
      expect(movie.title).toEqual(title)
    })

    it('should throw 404 error', () => {
      try {
        service.create(CREATE_MOVIE_DATA)
        const title = 'Updated Test'
        const movie = service.update(2, { title })
        expect(movie).toEqual(undefined)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })
})
