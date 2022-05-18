import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entities';

@Injectable()
export class MoviesService {
    private movies :Movie[] = [];

    getAll() : Movie[] {
        return this.movies;
    }

    getOne(id: string) : Movie {
        const movie= this.movies.find(movie => movie.id == parseInt(id))

        if(!movie){
            throw new NotFoundException(`Movie with ID ${id} not found`)
        }
        
        return movie;
    }

    create(data: any) {
        return this.movies.push({
            id: this.movies.length + 1,
            ...data
        })
    }

    delete(id: string) : boolean{
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id != parseInt(id));
        return true;
    }

    update(id:string , data){
        const movie = this.getOne(id);
        this.delete(id);
        this.movies.push({...movie, ...data});
    }

}
