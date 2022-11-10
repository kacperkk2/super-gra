import { Component, OnInit } from '@angular/core';
import { NotesClientService } from '../services/notes-client.service';

@Component({
  selector: 'app-stop-game',
  templateUrl: './stop-game.component.html',
  styleUrls: ['./stop-game.component.scss']
})
export class StopGameComponent implements OnInit {

  constructor(private notesClient: NotesClientService) { }

  ngOnInit(): void {
  }

  stopGame() {
    this.notesClient.deleteAllUsers().subscribe();
    this.notesClient.endGame().subscribe();
    localStorage.clear();
  }
}
