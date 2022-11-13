import { Component, OnInit } from '@angular/core';
import { AppSettings, GameState } from '../appSettings.module';
import { NavigationExtras, Router } from '@angular/router';
import { NotesClientService, ReturnUserDto } from '../services/notes-client.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfirmDialog } from '../dialogs/dialogs';

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.scss']
})
export class GameSettingsComponent implements OnInit {
  users: string[] = [];
  notes: string[] = [];
  team1: string[] = [];
  team2: string[] = [];

  timeForTurn: number = AppSettings.DEFAULT_ROUND_TIME;
  messedCardStrategy: string = AppSettings.DEFAULT_MESSED_CARD_STRATEGY;
  messedCardOptions: string[] = AppSettings.MESSED_CARD_OPTIONS;
  
  startStrategy: string = AppSettings.DEFAULT_START_STRATEGY;
  startOptions: string[] = AppSettings.START_OPTIONS;

  constructor(private router: Router, private notesClient: NotesClientService, public dialog: MatDialog) { }

  ngOnInit(): void {
    if (localStorage.getItem(GameState.HOST) != "true") {
      this.router.navigate([""]);
    }
    this.notesClient.getUsers().subscribe(fetchedUsers => {
      this.users = fetchedUsers.map(user => user.username);
      this.users = this.shuffle(this.users);
      this.team1 = this.users.slice(0, Math.floor(this.users.length / 2));
      this.team2 = this.users.slice(Math.floor(this.users.length / 2));
    });
    this.notesClient.getNotes().subscribe(fetchedNotes => {
      this.notes = fetchedNotes.map(note => note.content);
    });
  }

  moveFrom1To2(memberToMove: string) {
    this.team1 = this.team1.filter(member => member != memberToMove);
    this.team2.push(memberToMove);
  }

  moveFrom2To1(memberToMove: string) {
    this.team2 = this.team2.filter(member => member != memberToMove);
    this.team1.push(memberToMove);
  }

  startGame() {
    this.showStartGameConfirmDialog().subscribe((close) => {
      if (close == true) {
        let navigationExtras: NavigationExtras = {
          queryParams: {
              team1: this.team1,
              team2: this.team2,
              notes: this.notes,
              startStrategy: this.startStrategy,
              messedCardStrategy: this.messedCardStrategy,
              timeForTurn: this.timeForTurn,
          }
        };
        this.router.navigate(["game"], navigationExtras);
      }
    });
  }

  shuffle(a: string[]) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
  }

  addTime() {
    this.timeForTurn += 5;
  }

  subTime() {
    this.timeForTurn -= 5;
  }

  showStartGameConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialog, {width: '60%', data: 'Czy na pewno przejść do gry? Ustawień nie będzie można już zmienić'});
    return dialogRef.afterClosed();
  }
}
