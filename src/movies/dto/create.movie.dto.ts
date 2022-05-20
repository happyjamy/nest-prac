import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMovieDto{
    @IsString()
    readonly title: string;

    @IsNumber()
    readonly year: number;

    @IsOptional() //값이 empty 여도 무시
    @IsString({each : true}) //Specifies if validated value is an array and each of its items must be validated.
    readonly genres: string[];
}