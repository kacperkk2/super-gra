import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

export class AppSettings {
  public static URL: string = "https://super-gra-backend.herokuapp.com/";
  public static USERS_ENDPOINT: string = AppSettings.URL + "users";
  public static NOTES_ENDPOINT: string = AppSettings.URL + "notes";
  public static GAME_ENDPOINT: string = AppSettings.URL + "game";

  public static LOBBY_USERS_FETCH_INTERVAL: number = 3000;

  public static DEFAULT_ROUND_TIME: number = 60;

  public static MESSED_CARD_BACK_TO_BUCKET: string = "Hasło wraca do puli";
  public static MESSED_CARD_POINT_FOR_OPPONENT: string = "Punkt dla rywali";
  public static DEFAULT_MESSED_CARD_STRATEGY: string = AppSettings.MESSED_CARD_BACK_TO_BUCKET;
  public static MESSED_CARD_OPTIONS: string[] = [AppSettings.MESSED_CARD_POINT_FOR_OPPONENT, AppSettings.MESSED_CARD_BACK_TO_BUCKET]

  public static START_TEAM1: string = "Zespół 1";
  public static START_TEAM2: string = "Zespół 2";
  public static START_RANDOM: string = "Losuj";
  public static DEFAULT_START_STRATEGY: string = AppSettings.START_RANDOM;
  public static START_OPTIONS: string[] = [AppSettings.START_TEAM1, AppSettings.START_TEAM2, AppSettings.START_RANDOM]

  public static ROUND_NAMES: string[] = ["Taboo", "Kalambury", "Jedno słowo", "Nucenie"]

  public static CLICK_TIMEOUT: number = 500;
}

export class GameState {
  public static HOST: string = "HOST";
  public static USERNAME: string = "USERNAME";
  public static GAME_STATE_KEY: string = "GAME_STATE_KEY";
  public static GAME_NOT_STARTED: string = "GAME_NOT_STARTED";
  public static USERNAME_SEND_COMPLETED: string = "USERNAME_SEND_COMPLETED";
  public static NOTES_SEND_COMPLETED: string = "NOTES_SEND_COMPLETED";
  public static GAME_ONGOING: string = "GAME_ONGOING";
}