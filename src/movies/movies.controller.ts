import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateMovieDto } from './dto/create.movie.dto';
import { UpdateMovieDto } from './dto/update.movie.dto';
import { MoviesService } from './movies.service';

@Controller('movies') // <- url의 엔트리포인트를 컨트롤
export class MoviesController {

    constructor(private readonly moviesService: MoviesService){}

    @Get()
    getAll(){
        return this.moviesService.getAll();
    }

    @Get('/search')
    search(@Query('year') year: string){
        return `we search movies made after ${year}`;
    }

    @Get('/:id')
    getOne(@Param('id') movieId: number){
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create(@Body() data: CreateMovieDto){
        return this.moviesService.create(data);
    }

    @Delete('/:id')
    delete(@Param('id') movieId: number){
        return this.moviesService.delete(movieId);
    }

    @Patch('/:id')
    patch(@Param('id') movieId: number, @Body() data: UpdateMovieDto){
        return this.moviesService.update(movieId, data);
    }
}
