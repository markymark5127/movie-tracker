import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Movie {
  id: number;
  title: string;
  description: string;
  releaseYear: number;
  rating: number;
  streamingService: string;
}

interface Comment {
  id: number;
  movieId: number;
  userId: number;
  text: string;
  likes: number;
  dislikes: number;
}

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  @Input() movie?: Movie;
  comments: Comment[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    if (this.movie) {
      this.fetchComments(this.movie.id);
    }
  }

  fetchComments(movieId: number) {
    this.http.get<Comment[]>(`/api/movies/${movieId}/comments`).subscribe(data => {
      this.comments = data;
    });
  }

  likeComment(comment: Comment) {
    comment.likes++;
    this.http.post(`/api/comments/${comment.id}/like`, {}).subscribe();
  }

  dislikeComment(comment: Comment) {
    comment.dislikes++;
    this.http.post(`/api/comments/${comment.id}/dislike`, {}).subscribe();
  }
}
