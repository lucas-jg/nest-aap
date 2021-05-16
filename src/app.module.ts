import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';
import { ContentsController } from './contents/contents.controller';
import { ContentsService } from './contents/contents.service';

@Module({
  imports: [],
  controllers: [MoviesController, ContentsController],
  providers: [MoviesService, ContentsService],
})
export class AppModule {}
