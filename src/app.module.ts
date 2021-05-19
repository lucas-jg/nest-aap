import { Module } from '@nestjs/common'
import { MoviesController } from './movies/movies.controller'
import { MoviesService } from './movies/movies.service'
import { ContentsController } from './contents/contents.controller'
import { ContentsService } from './contents/contents.service'
import { MoviesModule } from './movies/movies.module'

@Module({
  imports: [MoviesModule],
  controllers: [ContentsController],
  providers: [ContentsService],
})
export class AppModule {}
