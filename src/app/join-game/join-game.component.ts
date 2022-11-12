import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { GameState } from '../appSettings.module';
import { NotesClientService } from '../services/notes-client.service';
import { catchError, tap } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MessageDialog } from '../dialogs/dialogs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

interface ErrorResponse {
  errorMessage: string;
}

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss']
})
export class JoinGameComponent implements OnInit {
  usernameForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)])
  });
  usernameValidationMessage: string = "Nick musi być dłuższy niż 3 znaki i krótszy niż 10";

  constructor(private router: Router, private notesClient: NotesClientService, public dialog: MatDialog, fb: FormBuilder) { }

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
    const username = this.usernameForm.controls['username'].value!.trim();
    this.notesClient.sendUser({username: username, isReady: false, isHost: false}).subscribe(
        (userDto) => {
          localStorage.setItem(GameState.USERNAME, username);
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