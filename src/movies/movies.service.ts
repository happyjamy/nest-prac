import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create.movie.dto';
import { UpdateMovieDto } from './dto/update.movie.dto';
import { Movie } from './entities/movie.entities';

@Injectable()
export class MoviesService {
    private movies :Movie[] = [];

    getAll() : Movie[] {
        return this.movies;
    }

    getOne(movieId: number) : Movie {
        const movie= this.movies.find(movie => movie.id === movieId)

        if(!movie){
            throw new NotFoundException(`Movie with ID ${movieId} not found`)
        }
        
        return movie;
    }

    create(data: CreateMovieDto) {
        return this.movies.push({
            id: this.movies.length + 1,
            ...data
        })
    }

    delete(movieId: number) : boolean{
        this.getOne(movieId);
        this.movies = this.movies.filter(movie => movie.id !== movieId);
        return true;
    }

    update(movieId: number , data : UpdateMovieDto){
        const movie = this.getOne(movieId);
        this.delete(movieId);
        this.movies.push({...movie, ...data});
    }

}
