import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { MessageDialog } from '../dialogs/dialogs';
import { NotesClientService } from '../services/notes-client.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private notesClient: NotesClientService, private router: Router, 
    public dialog: MatDialog, private themeService: ThemeService) { }

  ngOnInit(): void {
  }

  themeSwitched({ checked }: MatSlideToggleChange) {
    this.themeService.emitChange(checked);
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
