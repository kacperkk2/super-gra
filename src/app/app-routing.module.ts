import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameSettingsComponent } from './game-settings/game-settings.component';
import { GameComponent } from './game/game.component';
import { JoinGameComponent } from './join-game/join-game.component';
import { LobbyComponent } from './lobby/lobby.component';
import { MainComponent } from './main/main.component';
import { MakeNotesComponent } from './make-notes/make-notes.component';
import { StopGameComponent } from './stop-game/stop-game.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'join-game', component: JoinGameComponent },
  { path: 'make-notes', component: MakeNotesComponent },
  { path: 'lobby', component: LobbyComponent },
  { path: 'game-settings', component: GameSettingsComponent },
  { path: 'game', component: GameComponent },
  { path: 'stop-game', component: StopGameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }