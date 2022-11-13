import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../appSettings.module';
import { Subject } from 'rxjs';

@Injectable()
export class ThemeService {
  
    private emitChangeSource = new Subject<any>();
    changeEmitted$ = this.emitChangeSource.asObservable();
    
    emitChange(change: any) {
        this.emitChangeSource.next(change);
    }
}