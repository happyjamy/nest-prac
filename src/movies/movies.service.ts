import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entities';
import { CreateMovieDto } from './dto/create.movie.dto';

@Injectable()
export class MoviesService {
    private movies :Movie[] = [];

    getAll() : Movie[] {
        return this.movies;
    }

    getOne(id: number) : Movie {
        const movie= this.movies.find(movie => movie.id == id)
        
        if(!movie){
            throw new NotFoundException(`Movie with ID ${id} not found`)
        }
        
        return movie;
    }

    create(movieData: CreateMovieDto) {
        return this.movies.push({
          id: this.movies.length + 1,
          ...movieData,
        });
    }

    delete(id: number) : boolean{
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id != id);
        return true;
    }

    update(id: number , updateData){
        const movie = this.getOne(id);
        this.delete(id);
        this.movies.push({ ...movie, ...updateData});
    }

}
