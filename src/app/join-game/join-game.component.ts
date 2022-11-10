import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { GameState } from '../appSettings.module';
import { NotesClientService } from '../services/notes-client.service';
import { catchError, tap } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MessageDialog } from '../dialogs/dialogs';

interface ErrorResponse {
  errorMessage: string;
}

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss']
})
export class JoinGameComponent implements OnInit {
  username: string = "";

  constructor(private router: Router, private notesClient: NotesClientService, public dialog: MatDialog) { }

  ngOnInit(): void {
    if (localStorage.getItem(GameState.GAME_STATE_KEY) == GameState.GAME_ONGOING) {
      this.router.navigate([""]);
    }
    else if (localStorage.getItem(GameState.GAME_STATE_KEY) == GameState.USERNAME_SEND_COMPLETED) {
      this.router.navigate(["make-notes"]);
    }
    else if (localStorage.getItem(GameState.GAME_STATE_KEY) == GameState.NOTES_SEND_COMPLETED) {
      this.router.navigate(["lobby"]);
    }
  }

  saveUsername() {
    this.notesClient.sendUser({username: this.username, isReady: false, isHost: false}).subscribe(
        (userDto) => {
          localStorage.setItem(GameState.USERNAME, this.username);
          localStorage.setItem(GameState.GAME_STATE_KEY, GameState.USERNAME_SEND_COMPLETED);
          this.router.navigate(["make-notes"]);
        },
        (error) => {
          if (error.error.errorMessage == "Username already picked") {
            this.showUsernameAlreadyUsedMessageDialog();
          }
          else {
            this.showGenericErrorDialog();
          }
        }
    );
  }

  showUsernameAlreadyUsedMessageDialog() {
    this.dialog.open(MessageDialog, {width: '60%', data: 'Podany użytkownik już istnieje, zmień nazwę'});
  }

  showGenericErrorDialog() {
    this.dialog.open(MessageDialog, {width: '60%', data: 'Wystąpił błąd po stronie serwera'});
  }

  back() {
    this.router.navigate([""]);
  }
}