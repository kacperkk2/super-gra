import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import { AppSettings, GameState } from '../appSettings.module';
import { NotesClientService, ReturnUserDto } from '../services/notes-client.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MessageDialog } from '../dialogs/dialogs';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  displayedColumns: string[] = ['gracz', 'host', 'status'];
  dataSource = new MatTableDataSource<ReturnUserDto>([]);
  isHostPicked: boolean = false;
  readyToStart: boolean = false;
  isUserHost: boolean = false;
  usersSubscription!: Subscription;

  constructor(private router: Router, private notesClient: NotesClientService, public dialog: MatDialog) { }

  ngOnInit(): void {
    // if (localStorage.getItem(GameState.GAME_STATE_KEY) != GameState.NOTES_SEND_COMPLETED) { // TODO jakos zablokowac wejscie tu po urlach jak jest rozgrywka i jak jeszcze ktos nie wyslal username i kart
    //   this.router.navigate(["make-notes"]);
    // }
    this.usersSubscription = timer(0, AppSettings.LOBBY_USERS_FETCH_INTERVAL).pipe(
      switchMap(() => this.notesClient.getUsers())
    ).subscribe(users => {
      if (this.isHostPicked == false && users.filter(user => user.host).length > 0) {
        this.isHostPicked = true;
      }
      if (this.isHostPicked && users.filter(user => !user.ready).length == 0) {
        this.readyToStart = true;
      }
      this.dataSource.data = users;
    });
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }

  fetchUsers() {
    this.notesClient.getUsers().subscribe(users => {
      if (this.isHostPicked == false && users.filter(user => user.host).length > 0) {
        this.isHostPicked = true;
      }
      if (this.isHostPicked && users.filter(user => !user.ready).length == 0) {
        this.readyToStart = true;
      }
      this.dataSource.data = users;
    });
  }

  becomeHost() {
    const username = localStorage.getItem(GameState.USERNAME);
    this.notesClient.setHost(username!).subscribe(
      (userDto) => {
        this.isUserHost = true;
        this.notesClient.startGame().subscribe();
        this.fetchUsers();
      },
      (error) => {
        if (error.error.errorMessage == "Host already picked") {
          this.showHostAlreadyPickedMessageDialog();
        }
        else {
          this.showGenericErrorDialog();
        }
      }
    );
  }

  beginGame() {
    localStorage.removeItem(GameState.USERNAME);
    if (this.isUserHost) {
      localStorage.setItem(GameState.HOST, "true");
      localStorage.setItem(GameState.GAME_STATE_KEY, GameState.GAME_ONGOING);
      this.router.navigate(["game-settings"]);
    }
    else {
      this.showNotHostStartGameDialog().subscribe(() => {
        localStorage.removeItem(GameState.HOST);
        localStorage.removeItem(GameState.USERNAME);
        localStorage.removeItem(GameState.GAME_STATE_KEY);
        this.router.navigate([""]);
      });
    }
  }

  showHostAlreadyPickedMessageDialog() {
    this.dialog.open(MessageDialog, {width: '60%', data: 'Inna osoba jest już hostem'});
  }

  showGenericErrorDialog() {
    this.dialog.open(MessageDialog, {width: '60%', data: 'Wystąpił błąd po stronie serwera'});
  }

  showNotHostStartGameDialog() {
    const dialogRef = this.dialog.open(MessageDialog, {width: '60%', data: 'Dalsza część gry odbędzie się na telefonie hosta'});
    return dialogRef.afterClosed();
  }

  back() {
    this.router.navigate([""]);
  }
}
