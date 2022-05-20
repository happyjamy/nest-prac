import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll", ()=>{
    it("should return an array", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    } )
  })

  describe("getOne", ()=>{
    it("should return a movie", ()=>{
      service.create({
        title: "test",
        year: 2020,
        genres: ["horror"]
      })
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    })

    it("should throw a NotFoundException", ()=>{
      try{
        service.getOne(123232);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("Movie with ID 123232 not found");
      }
    })
  })

  describe("delete", ()=>{
    it("should delete a movie", ()=>{
      service.create({
        title: "test",
        year: 2020,
        genres: ["horror"]
      })
      const beforeMovies = service.getAll(); //기존 배열. 얕은복사.
      service.delete(1);
      const afterMovies = service.getAll(); // filter로 인해 새로운 배열이 반환됨. 참조안함.
      console.log(beforeMovies);
      console.log(afterMovies);
      expect(afterMovies.length).toBeLessThan(beforeMovies.length);
    })
    
    it("should throw a NotFoundException", ()=>{
      try{
        service.delete(123232);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("Movie with ID 123232 not found");
      }
    })
  })

  describe("update", ()=>{
    it("should update a movie", ()=>{
      service.create({
        title: "test",
        year: 2020,
        genres: ["horror"]
      })
      service.update(1,{title: "test2"})
      const afterMovies = service.getOne(1);

      expect(afterMovies.title).toEqual("test2");
    })

    it("should throw a NotFoundException", ()=>{
      try{
        service.update(123232,{title: "test2"});
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual("Movie with ID 123232 not found");
      }
    })
  })

  describe("create", ()=>{
    it("should create a movie", ()=>{
      const beforeMovies = [...service.getAll()]; //깊은복사. 
      service.create({
        title: "test",
        year: 2020,
        genres: ["horror"]
      });
      const afterMovies = service.getAll();
      expect(afterMovies.length).toBeGreaterThan(beforeMovies.length);
    })
  })
});

/*
beforeEach(fn, timeout)
각각의 테스트가 실행되기 전에 매번 함수를 실행합니다.
각각의 테스트 전에 각 테스트에서 사용할 전역 상태를 재설정하려는 경우에 유용합니다.
함수가 promise을 반환하거나 generator인 경우 Jest는 테스트를 실행하기 전에 해당 promise가 해결될 때까지 기다립니다.
밀리초로 대기할 시간을 지정할 수 있습니다. (기본 시간 5초)
https://jestjs.io/docs/api#beforeeachfn-timeout

beforeAll(fn, timeout)
모든 테스트가 실행되기 전에 딱 한 번 함수를 실행합니다.

afterEach(fn, timeout)
각각의 테스트가 완료된 후 함수를 실행합니다.

afterAll(fn, timeout)
모든 테스트가 완료된 후 함수를 실행합니다.
*/
