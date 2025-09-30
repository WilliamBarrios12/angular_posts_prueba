import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, RouterModule], // aquí agregas todos los módulos que uses
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Mi Proyecto Angular';
}





