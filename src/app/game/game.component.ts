import { ThisReceiver } from '@angular/compiler';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSettings } from '../appSettings.module';
import { TimeAdjustDialog } from '../dialogs/dialogs';
import { NotesClientService } from '../services/notes-client.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  // const data
  defaultTimeForTurn: number = 0;
  teams: string[][] = [];
  notes: string[] = [];
  roundNames: string[] = AppSettings.ROUND_NAMES;
  messedCardStrategy: string = "";

  // data
  notesLeftInRound: string[] = [];
  totalPoints: number[] = [];
  pointsInRound: number[] = [];
  whoStartsRound: TURN = TURN.TEAM1;
  whoNowPlays: TURN = TURN.TEAM1;
  currentRound: number = 1;
  currentCard: string = "";
  messedCardsInTurn: string[] = [];
  inTurnScore: number = 0;
  counter: number = 0;
  timeForTurn: number = 0;

  // state
  state: GAME_STATE = GAME_STATE.BEFORE_TURN;
  allStates = GAME_STATE;
  stateInTurn: TURN_STATE = TURN_STATE.CARD_VIEW;
  inTurnAllStates = TURN_STATE;

  constructor(private route: ActivatedRoute, private router: Router, private notesClient: NotesClientService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.blockRefreshAndPageBack();
    this.notesClient.deleteAllUsers().subscribe();
    this.state = GAME_STATE.BEFORE_TURN;
    this.route.queryParams.subscribe(params => {
      this.teams = [params['team1'], params['team2']];
      this.notes = params['notes'];
      this.timeForTurn = params['timeForTurn'];
      this.defaultTimeForTurn = params['timeForTurn'];
      this.messedCardStrategy = params['messedCardStrategy'];
      this.whoStartsRound = this.getStartStrategy(params['startStrategy']);
      this.whoNowPlays = this.whoStartsRound;
    });
    this.pointsInRound = [0, 0];
    this.totalPoints = [0, 0];
    this.notesLeftInRound = this.shuffle([...this.notes]);
  }

  blockRefreshAndPageBack() {
    window.addEventListener("beforeunload", function (e) {
      var confirmationMessage = "Po wyjściu ze strony cały progres zostanie utracony";
      e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
      return confirmationMessage;              // Gecko, WebKit, Chrome <34
    });
    window.addEventListener("popstate", function (e) {
        history.go(1);
    });
  }

  getStartStrategy(startStrategy: string) {
    if (startStrategy == AppSettings.START_RANDOM) {
      return this.randomIntFromInterval(0, 1);
    }
    else if (startStrategy == AppSettings.START_TEAM1) {
      return TURN.TEAM1;
    }
    else if (startStrategy == AppSettings.START_TEAM2) {
      return TURN.TEAM2;
    }
    else {
      return TURN.TEAM2;
    }
  }

  showTimeAdjustDialog() {
    const dialogRef = this.dialog.open(TimeAdjustDialog, {width: '60%', data: this.defaultTimeForTurn});
    dialogRef.afterClosed().subscribe(newTimeForTurn => {
      if (newTimeForTurn != null) {
        this.timeForTurn = newTimeForTurn;
      }
    });
  }

  goToPreStart() {
    this.prepareTimer();
    this.state = GAME_STATE.PRE_START;

  }

  goToTurn() {
    this.nextCard();
    this.state = GAME_STATE.TURN;
    this.timerCount();
  }

  nextCard() {
    this.currentCard = this.notesLeftInRound.pop()!;
    this.stateInTurn = TURN_STATE.CARD_VIEW;
  }

  messedButtonClickCount = 0;
  messedCardDoubleClick() {
      this.messedButtonClickCount++;
      if (this.messedButtonClickCount === 2) {
          this.messedCard();
      }
      setTimeout(() => {
          this.messedButtonClickCount = 0;
      }, AppSettings.CLICK_TIMEOUT)
  }
  messedCard() {
    if (this.messedCardStrategy == AppSettings.MESSED_CARD_BACK_TO_BUCKET) {
      this.messedCardsInTurn.push(this.currentCard);
    }
    else if (this.messedCardStrategy == AppSettings.MESSED_CARD_POINT_FOR_OPPONENT) {
      if (this.whoNowPlays == TURN.TEAM1) {
        this.pointsInRound[TURN.TEAM2]++;
      }
      else {
        this.pointsInRound[TURN.TEAM1]++;
      }
    }
    this.afterCardDecision();
  }

  guessedButtonClickCount = 0;
  guessedCardDoubleClick() {
      this.guessedButtonClickCount++;
      if (this.guessedButtonClickCount === 2) {
          this.guessedCard();
      }
      setTimeout(() => {
          this.guessedButtonClickCount = 0;
      }, AppSettings.CLICK_TIMEOUT)
  }
  guessedCard() {
    this.pointsInRound[this.whoNowPlays]++;
    this.inTurnScore++;
    this.afterCardDecision();
  }

  afterCardDecision() {
    if (this.notesLeftInRound.length == 0) {
      this.messedCardsInTurn.forEach(card => this.notesLeftInRound.push(card));
      this.notesLeftInRound = this.shuffle(this.notesLeftInRound);
      this.state = GAME_STATE.AFTER_TURN;
    }
    else {
      this.stateInTurn = TURN_STATE.EMPTY_VIEW;
    }
  }

  timeEnded() {
    if (this.stateInTurn == TURN_STATE.CARD_VIEW) {
      this.messedCardsInTurn.push(this.currentCard);
    }
    this.messedCardsInTurn.forEach(card => this.notesLeftInRound.push(card));
    this.notesLeftInRound = this.shuffle(this.notesLeftInRound);
    this.state = GAME_STATE.AFTER_TURN;
  }

  goToNewTurnOrNewRound() {
    this.timeForTurn = this.defaultTimeForTurn;
    if (this.notesLeftInRound.length == 0) {
      this.totalPoints[0] += this.pointsInRound[0];
      this.totalPoints[1] += this.pointsInRound[1];
      this.state = GAME_STATE.AFTER_ROUND;
    }
    else {
      this.prepareDataForNextTurn();
      this.state = GAME_STATE.BEFORE_TURN;
    }
  }

  goToBeforeTurnOrAfterGame() {
    if (this.currentRound == AppSettings.ROUND_NAMES.length) {
      this.notesClient.endGame().subscribe();
      this.state = GAME_STATE.AFTER_GAME;
    }
    else {
      this.prepareDataForNextRound();
      this.state = GAME_STATE.BEFORE_TURN;
    }
  }

  goToMain() {
    localStorage.clear();
    this.router.navigate([""]);
  }

  prepareDataForNextRound() {
    this.currentRound++;
    this.whoStartsRound = (this.whoStartsRound == TURN.TEAM1) ? TURN.TEAM2 : TURN.TEAM1;
    this.whoNowPlays = this.whoStartsRound;
    this.currentCard = "";
    this.messedCardsInTurn = [];
    this.inTurnScore = 0;
    this.pointsInRound = [0, 0];
    this.notesLeftInRound = this.shuffle([...this.notes]);
    this.stateInTurn = TURN_STATE.EMPTY_VIEW;
  }

  prepareDataForNextTurn() {
    this.whoNowPlays = (this.whoNowPlays == TURN.TEAM1) ? TURN.TEAM2 : TURN.TEAM1;
    this.currentCard = "";
    this.messedCardsInTurn = [];
    this.inTurnScore = 0;
    this.stateInTurn = TURN_STATE.EMPTY_VIEW;
  }

  prepareTimer() {
    this.counter = this.timeForTurn;
  }

  timerCount() {
    setTimeout( () => {
      this.counter -= 1;
      this.process();
    }, 1000);
  }

  process() {
    if (this.state != GAME_STATE.TURN) {
      return;
    }
    if (this.counter == 0) {
      this.timeEnded();
    }
    else {
      this.timerCount();
    }
  }

  formatTimer(seconds: number) {
    return seconds;
  }

  randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
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
}

enum GAME_STATE {
  BEFORE_TURN, PRE_START, TURN, AFTER_TURN, AFTER_ROUND, AFTER_GAME
}

enum TURN_STATE {
  CARD_VIEW, EMPTY_VIEW
}

enum TURN {
  TEAM1, TEAM2
}