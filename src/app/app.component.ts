import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, RouterModule], 
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Mi Proyecto Angular';
}


