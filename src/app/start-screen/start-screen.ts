import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/* --- Definir el componente de la vista de inicio --- */
@Component({

  selector: 'app-start-screen',
  imports: [RouterModule],
  templateUrl: './start-screen.html',

})

/* --- Clase de la lógica de la vista de inicio --- */
export class StartScreen {

  /* --- Método para cerrar la aplicación --- */
  exitGame() {

    window.close();
    
  }

}
