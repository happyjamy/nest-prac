import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // 아무 데코레이터도 없는 속성의 object는 거름.
    forbidNonWhitelisted: true, // 리퀘스트 자체를 막음. 에러 send
    transform: true, // 유저가 보낸 data 타입을 실제 원하는 타입으로 변환해줌
  }));
  await app.listen(3000);
}
bootstrap();
