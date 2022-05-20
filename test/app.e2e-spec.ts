import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true, // 아무 데코레이터도 없는 속성의 object는 거름.
      forbidNonWhitelisted: true, // 리퀘스트 자체를 막음. 에러 send
      transform: true, // 유저가 보낸 data 타입을 실제 원하는 타입으로 변환해줌
    }));
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to jamy homepage');
  });

  describe('/movies', ()=>{
    it('GET', ()=>{
      return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect([]);
    })

    it('POST 201', ()=>{
      return request(app.getHttpServer())
      .post('/movies')
      .send({
        title: "test",
        year: 2020,
        genres: ["horror"]
      })
      .expect(201)
    })

    it('POST 400', ()=>{
      return request(app.getHttpServer())
      .post('/movies')
      .send({
        title: "test",
        genres: ["horror"]
      })
      .expect(400)
    })

    it('DELETE', ()=>{
      return request(app.getHttpServer())
      .delete('/movies')
      .expect(404);
    })

    describe('/movies/:id', ()=>{
      it('GET 200', ()=>{
        return request(app.getHttpServer())
        .get('/movies/1')
        .expect(200)
      })
      
      it('GET 404', ()=>{
        return request(app.getHttpServer())
        .get('/movies/123232')
        .expect(404)
      })

      it('PATCH', ()=>{
        return request(app.getHttpServer())
        .patch('/movies/1')
        .send({
          title: "test2",
          year: 2020,
          genres: ["horror"]
        })
        .expect(200)
      })

      it('DELETE', ()=>{
        return request(app.getHttpServer())
        .delete('/movies/1')
        .expect(200);
      })
    })
  })
});
