import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

@Module({
  imports: [MoviesModule],
  controllers: [AppController],
  // url 가져오기, 함수 실행하기 = 라우터
  providers: [],
})
//모듈 한가지 일을 하는 앱?
export class AppModule {}
