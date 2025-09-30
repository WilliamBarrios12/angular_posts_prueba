import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { PostsService } from '../services/posts.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-posts-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  postForm!: FormGroup;
  loading = false;
  isEdit = false;
  postId?: number;

  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postForm = this.fb.group({
      userId: [null, [Validators.required, Validators.min(1)]],
      title: ['', [Validators.required, Validators.minLength(5)]],
      body: ['', [Validators.required, Validators.minLength(5)]]
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      this.postId = Number(idParam);
      this.loadPost(this.postId);
    }
  }

  cancel(): void {
    this.router.navigate(['/posts']);
  }

  loadPost(id: number) {
  this.loading = true;
  this.postsService.getPost(id).subscribe({
    next: (p) => {
      if (p) {
        this.postForm.patchValue(p);
      } else {
        alert('No se encontró la publicación.');
      }
      this.loading = false;
    },
    error: () => {
      this.loading = false;
      alert('Error al cargar la publicación para editar.');
    }
  });
}


  submit() {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }

    const payload: Post = this.postForm.value;
    this.loading = true;

    const action$ = this.isEdit && this.postId
      ? this.postsService.updatePost(this.postId, payload)
      : this.postsService.createPost(payload); // ahora genera ID único en memoria

    action$.subscribe({
      next: () => {
        this.loading = false;
        alert(this.isEdit ? 'Publicado actualizado' : 'Publicado creado');
        this.router.navigate(['/posts']);
      },
      error: () => {
        this.loading = false;
        alert('Error al guardar la publicación');
      }
    });
  }
}



