import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Movie {
  id: number;
  title: string;
  description: string;
  releaseYear: number;
  rating: number;
  streamingService: string;
}

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  selectedMovie?: Movie;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies() {
    this.http.get<Movie[]>('/api/movies').subscribe(data => {
      this.movies = data;
    });
  }

  selectMovie(movie: Movie) {
    this.selectedMovie = movie;
  }
}
