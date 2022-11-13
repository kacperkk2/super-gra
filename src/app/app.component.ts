import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ThemeService]
})
export class AppComponent {
  title = 'super-gra';

  isDark: boolean = false;

  constructor(private themeService: ThemeService, @Inject(DOCUMENT) private document: Document, private renderer: Renderer2) {
    themeService.changeEmitted$.subscribe(change => {
        this.switchTheme(change);
    });
  }

  switchTheme(isDarkMode: any) {
    console.log(isDarkMode);
    this.renderer.setAttribute(this.document.body, 'class', isDarkMode ? "mat-app-background theme-dark" : " mat-app-backgroundtheme-light")
  }
}
