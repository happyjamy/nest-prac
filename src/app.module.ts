import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';

@Module({
  imports: [],
  controllers: [MoviesController],
  // url 가져오기, 함수 실행하기 = 라우터
  providers: [MoviesService],
})
//모듈 한가지 일을 하는 앱?
export class AppModule {}
