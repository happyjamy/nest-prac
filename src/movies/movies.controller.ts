import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create.movie.dto';

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
    getOne(@Param('id') id: number){
        return this.moviesService.getOne(id);
    }

    @Post()
    create(@Body() movieData: CreateMovieDto){
        return this.moviesService.create(movieData);
    }

    @Delete('/:id')
    delete(@Param('id') id: number){
        return this.moviesService.delete(id);
    }

    @Patch('/:id')
    patch(@Param('id') id: number, @Body() updateData: any){
        return this.moviesService.update(id, updateData);
    }
}
