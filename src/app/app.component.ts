import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

import { LANGUAGES } from 'app/core/injection-tokens';
import { environment } from 'environments/environment';
import { tap } from 'rxjs/operators';
import { UiQuery } from './shared/states/ui/ui.query';
import { UiService } from './shared/states/ui/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  constructor(
    private translate: TranslateService,
    private uiService: UiService,
    private uiQuery: UiQuery,
    @Inject(LANGUAGES) public languages
  ) {}

  ngOnInit() {
    const browserLanguage = this.translate.getBrowserLang();

    // if dev decided to use the browser language as default and if this language is handled by the app, use it
    const defaultLanguage =
      environment.useBrowserLanguageAsDefault &&
      this.languages.includes(browserLanguage)
        ? browserLanguage
        : this.languages[0];

    // default and fallback language
    // if a translation isn't found in a language,
    // it'll try to get it on the default language
    this.translate.setDefaultLang(defaultLanguage);
    // TODO: SET LANGUAGE HERE
    this.uiService.updateLanguage(defaultLanguage);

    // when the language changes in store,
    // change it in translate provider
    // TODO: SELECT LANGUAGE HERE
    this.uiQuery.currentLangage$
      .pipe(tap(language => this.translate.use(language)))
      .subscribe();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
