import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/* --- Definir el componente raíz de la aplicación --- */
@Component({

  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',

})

export class App {

  protected readonly title = signal('clicker_angular');

}