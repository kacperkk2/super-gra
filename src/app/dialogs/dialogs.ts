import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'message-dialog',
    templateUrl: 'message-dialog.html',
})
export class MessageDialog {
    constructor(
        public dialogRef: MatDialogRef<MessageDialog>,
        @Inject(MAT_DIALOG_DATA) public message: string,
    ) {}
}

@Component({
    selector: 'confirm-dialog',
    templateUrl: 'confirm-dialog.html',
})
export class ConfirmDialog {
    constructor(
        public dialogRef: MatDialogRef<ConfirmDialog>,
        @Inject(MAT_DIALOG_DATA) public message: string,
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}

@Component({
    selector: 'time-adjust-dialog',
    templateUrl: 'time-adjust-dialog.html',
})
export class TimeAdjustDialog {
    constructor(
        public dialogRef: MatDialogRef<TimeAdjustDialog>,
        @Inject(MAT_DIALOG_DATA) public timeForTurn: number,
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    addTime(): void {
        this.timeForTurn = Number(this.timeForTurn);
        this.timeForTurn += 5;
    }

    subTime(): void {
        this.timeForTurn = Number(this.timeForTurn);
        this.timeForTurn -= 5;
    }
}