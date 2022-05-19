import { IsNumber, IsString } from "class-validator";


export class CreateMovieDto {
  //받을 데이터의 타입을 정해주는 것
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly year: number;
  @IsString({ each: true })
  readonly genres: string[];
}