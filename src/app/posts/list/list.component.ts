import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostsService } from '../services/posts.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  posts: Post[] = [];
  loading = false;
  error = '';

  constructor(private postsService: PostsService, private router: Router) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.loading = true;
    this.postsService.getPosts().subscribe({
      next: (all) => {
        this.posts = all; // ahora ya combina posts locales + API
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar las publicaciones';
        this.loading = false;
      }
    });
  }

  view(id?: number) {
    if (!id) return;
    this.router.navigate(['/posts', id]);
  }

  edit(id?: number) {
    if (!id) return;
    this.router.navigate(['/posts/edit', id]);
  }

   confirmDelete(id?: number) {
    if (!id) return;
    if (!window.confirm('¿Seguro que deseas eliminar esta publicación?')) return;

    this.postsService.deletePost(id).subscribe({
      next: (success) => {
        if (success) {
          // eliminamos directamente de la lista sin recargar
          this.posts = this.posts.filter(p => p.id !== id);
        } else {
          alert('Error al eliminar la publicación');
        }
      },
      error: () => alert('Error al eliminar la publicación')
    });
  }
}



