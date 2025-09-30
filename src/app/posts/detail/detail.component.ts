import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PostsService } from '../services/posts.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-posts-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {
  post?: Post;
  loading = false;
  error = '';

 constructor(
  private route: ActivatedRoute,
  private postsService: PostsService,
  public router: Router  
) {}


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error = 'Id inválido';
      return;
    }
    this.loading = true;
    this.postsService.getPost(id).subscribe({
      next: (p) => {
        this.post = p;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se encontró la publicación';
        this.loading = false;
      }
    });
  }

  back(): void {
    this.router.navigate(['/posts']);
  }

  editPost(): void {
  if (this.post) {
    this.router.navigate(['/posts/edit', this.post.id]);
  }
}

}

