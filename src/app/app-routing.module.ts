import { Routes } from '@angular/router';
import { ListComponent } from './posts/list/list.component';
import { DetailComponent } from './posts/detail/detail.component';
import { FormComponent } from './posts/form/form.component';

export const appRoutes: Routes = [
  { path: 'posts', component: ListComponent },
  { path: 'posts/create', component: FormComponent },
  { path: 'posts/:id', component: DetailComponent },
  { path: 'posts/edit/:id', component: FormComponent },
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: '**', redirectTo: 'posts' }
];


