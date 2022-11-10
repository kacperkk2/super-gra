import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageDialog } from '../dialogs/dialogs';
import { NotesClientService } from '../services/notes-client.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private notesClient: NotesClientService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  checkIfCanPlay() {
    this.notesClient.checkIfGameOngoing().subscribe(gameInfo => {
        if (gameInfo.info == "no game") {
          this.router.navigate(["join-game"]);
        }
        else {
          this.showGameOngoingDialog();
        }
    });
  }

  showGameOngoingDialog() {
    this.dialog.open(MessageDialog, {width: '60%', data: 'Gra jest w trakcie. Rozgrywka prowadzona jest na telefonie hosta'});
  }
}
