import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppSettings, GameState } from '../appSettings.module';
import { NotesClientService } from '../services/notes-client.service';

@Component({
  selector: 'app-make-notes',
  templateUrl: './make-notes.component.html',
  styleUrls: ['./make-notes.component.scss']
})
export class MakeNotesComponent implements OnInit {
  notesForm = new FormGroup({
    place: new FormControl('', [Validators.required, maxWords(AppSettings.MAX_WORDS_IN_NOTE)]),
    event: new FormControl('', [Validators.required, maxWords(AppSettings.MAX_WORDS_IN_NOTE)]),
    thing: new FormControl('', [Validators.required, maxWords(AppSettings.MAX_WORDS_IN_NOTE)]),
  });
  username: string = "";
  noteValidationMessage: string = "Co najmniej jeden wyraz i co najwyżej " + AppSettings.MAX_WORDS_IN_NOTE;

  constructor(private router: Router, private notesClient: NotesClientService) { }

  ngOnInit(): void {
    if (localStorage.getItem(GameState.GAME_STATE_KEY) != GameState.USERNAME_SEND_COMPLETED) {
      this.router.navigate(["join-game"]);
    }
    this.username = localStorage.getItem(GameState.USERNAME)!;
  }

  saveNotes() {
    const placeVal = this.notesForm.controls['place'].value!;
    const eventVal = this.notesForm.controls['event'].value!;
    const thingVal = this.notesForm.controls['thing'].value!;
    this.notesClient.sendNotes(this.username, {place: placeVal, event: eventVal, thing: thingVal}).subscribe(
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

export function maxWords(words: number): ValidatorFn {
  return (control: AbstractControl) : ValidationErrors | null => {
      const value = control.value as string;
      if (!value) {
          return null;
      }
      return value.trim().split(" ").length > words ? {maxWords: true} : null;
  }
}