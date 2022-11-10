import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameState } from '../appSettings.module';
import { NotesClientService } from '../services/notes-client.service';

@Component({
  selector: 'app-make-notes',
  templateUrl: './make-notes.component.html',
  styleUrls: ['./make-notes.component.scss']
})
export class MakeNotesComponent implements OnInit {
  place: string = "";
  event: string = "";
  thing: string = "";
  username: string | null = "";
  noteValidationMessage: string = "Nie może być puste i co najwyżej 3 wyrazy";

  constructor(private router: Router, private notesClient: NotesClientService) { }

  ngOnInit(): void {
    if (localStorage.getItem(GameState.GAME_STATE_KEY) != GameState.USERNAME_SEND_COMPLETED) {
      this.router.navigate(["join-game"]);
    }
    this.username = localStorage.getItem(GameState.USERNAME);
  }

  saveNotes() {
    this.notesClient.sendNotes(this.username, {place: this.place, event: this.event, thing: this.thing}).subscribe(
        () => {
          localStorage.setItem(GameState.GAME_STATE_KEY, GameState.NOTES_SEND_COMPLETED);
          this.router.navigate(["lobby"]);
        }
    );
  }

  back() {
    this.router.navigate([""]);
  }
}
