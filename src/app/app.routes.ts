import { Routes } from '@angular/router';
import { StartScreen } from './start-screen/start-screen';
import { GameScreen } from './game-screen/game-screen';
import { ScoresScreen } from './scores-screen/scores-screen';
import { InstructionsScreen } from './instructions-screen/instructions-screen';

export const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: StartScreen },
  { path: 'game', component: GameScreen },
  { path: 'scores', component: ScoresScreen },
  { path: 'instructions', component: InstructionsScreen }
];


