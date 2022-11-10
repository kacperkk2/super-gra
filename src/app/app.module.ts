import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { JoinGameComponent } from './join-game/join-game.component';
import {MatFormFieldModule, } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { FormGroup, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon'
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MakeNotesComponent } from './make-notes/make-notes.component';
import { LobbyComponent } from './lobby/lobby.component';
import { MessageDialog, ConfirmDialog } from './dialogs/dialogs';
import {MatTooltipModule} from '@angular/material/tooltip';
import { GameSettingsComponent } from './game-settings/game-settings.component';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import { GameComponent } from './game/game.component';
import { FormatTimePipe } from './game/pipe';
import { StopGameComponent } from './stop-game/stop-game.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    JoinGameComponent,
    MakeNotesComponent,
    LobbyComponent,
    MessageDialog,
    ConfirmDialog,
    GameSettingsComponent,
    GameComponent,
    FormatTimePipe,
    StopGameComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    FlexLayoutModule,
    MatIconModule,
    MatGridListModule,
    MatDividerModule,
    MatDialogModule,
    HttpClientModule,
    MatTooltipModule,
    MatListModule,
    MatRadioModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
