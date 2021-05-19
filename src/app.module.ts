import { Module } from '@nestjs/common'
import { ContentsController } from './contents/contents.controller'
import { ContentsService } from './contents/contents.service'
import { MoviesModule } from './movies/movies.module'

@Module({
  imports: [MoviesModule],
  controllers: [ContentsController],
  providers: [ContentsService],
})
export class AppModule {}
