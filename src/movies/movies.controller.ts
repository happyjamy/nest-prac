import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
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
    getOne(@Param('id') id: string){
        return this.moviesService.getOne(id);
    }

    @Post()
    create(@Body() data: any){
        return this.moviesService.create(data);
    }

    @Delete('/:id')
    delete(@Param('id') id: string){
        return this.moviesService.delete(id);
    }

    @Patch('/:id')
    patch(@Param('id') id: string, @Body() data: any){
        return this.moviesService.update(id, data);
    }
}
