import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../appSettings.module';


export interface UserDto {
  isReady: boolean;
  username: string;
  isHost: boolean;
}

export interface ReturnUserDto {
  ready: boolean;
  username: string;
  host: boolean;
}

interface NotesDto {
  place: string;
  event: string;
  thing: string;
}

interface SingleNoteDto {
  content: string;
}

interface GameInfo {
  info: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotesClientService {

  readonly USERS_URL = AppSettings.USERS_ENDPOINT;
  readonly NOTES_URL = AppSettings.NOTES_ENDPOINT;
  readonly GAME_URL = AppSettings.GAME_ENDPOINT;
  
  constructor(private httpClient: HttpClient) {
  }

  sendUser(user: UserDto) {
    return this.httpClient.post<ReturnUserDto>(this.USERS_URL, user);
  }

  setHost(username: string) {
    return this.httpClient.post<ReturnUserDto>(this.USERS_URL + "/setHost?username=" + username, null);
  }

  getUsers() {
    return this.httpClient.get<ReturnUserDto[]>(this.USERS_URL);
  }

  getNotes() {
    return this.httpClient.get<SingleNoteDto[]>(this.NOTES_URL);
  }

  sendNotes(username: string | null, notes: NotesDto) {
    return this.httpClient.post<UserDto>(this.USERS_URL + "/" + username + "/notes", notes);
  }

  deleteAllUsers() {
    return this.httpClient.delete(this.USERS_URL);
  }

  startGame() {
    return this.httpClient.post(this.GAME_URL, null);
  }

  endGame() {
    return this.httpClient.delete(this.GAME_URL);
  }

  checkIfGameOngoing() {
    return this.httpClient.get<GameInfo>(this.GAME_URL);
  }
}
