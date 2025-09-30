import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../models/post.model';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private localPosts: Post[] = [];
  private nextId = 1000; // para posts locales, aseguramos ID único

  constructor(private http: HttpClient) {}

  // Obtener todos los posts (API + locales) limitando a 10
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl).pipe(
      map(apiPosts => [...this.localPosts, ...apiPosts].slice(0, 10)), // agregamos locales primero
      catchError(() => of([...this.localPosts].slice(0, 10))) // si falla API, devolvemos solo locales
    );
  }

  // Obtener un solo post
  getPost(id: number): Observable<Post | undefined> {
    const local = this.localPosts.find(p => p.id === id);
    if (local) {
      return of(local);
    }
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  // Crear un post
  createPost(post: Post): Observable<Post> {
    const newPost = { ...post, id: this.nextId++ };
    this.localPosts.unshift(newPost); // agregamos al inicio para que aparezca primero
    return of(newPost);
  }

  // Actualizar un post
  updatePost(id: number, post: Post): Observable<Post> {
    const index = this.localPosts.findIndex(p => p.id === id);
    if (index >= 0) {
      this.localPosts[index] = { ...post, id };
      return of(this.localPosts[index]);
    }
    return this.http.put<Post>(`${this.apiUrl}/${id}`, post);
  }

  // Eliminar un post
  deletePost(id: number): Observable<boolean> {
    const index = this.localPosts.findIndex(p => p.id === id);
    if (index >= 0) {
      this.localPosts.splice(index, 1);
      return of(true);
    }
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
