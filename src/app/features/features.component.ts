import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil, tap } from 'rxjs/operators';

import { LANGUAGES } from 'app/core/injection-tokens';
import { Ui } from 'app/shared/states/ui/ui.interface';
import { UiQuery } from 'app/shared/states/ui/ui.query';
import { UiService } from 'app/shared/states/ui/ui.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
})
export class FeaturesComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  public ui$: Observable<Ui> = null;

  public language: string;

  public isSidenavOpened$: Observable<boolean>;
  public sidenavType: 'over' | 'side' = 'over';

  constructor(
    @Inject(LANGUAGES) public languages,
    private uiQuery: UiQuery,
    private uiService: UiService,
    private media$: MediaObserver
  ) {
    // if we move this block into ngOnInit, it doesn't get fired the first time
    // this is probably an issue with flexLayout
    this.media$.media$
      .pipe(
        takeUntil(this.onDestroy$),
        map(
          (change: MediaChange) => change.mqAlias as 'xs' | 'sm' | 'md' | 'lg'
        ),
        distinctUntilChanged(),
        tap(size => {
          if (size === 'xs' || size === 'sm') {
            this.closeSidenav();
            this.sidenavType = 'over';
          } else {
            this.isSidenavOpened$ = of(true);
            this.openSidenav();
            this.sidenavType = 'side';
          }
        })
      )
      .subscribe();
  }

  ngOnInit() {
    // TODO: SELECT THE UI STATE ABOUT SIDEBAR FROM STORE
    this.isSidenavOpened$ = this.uiQuery.isSidenavVisible$;

    // TODO: SELECT THE LANGUAGE FROM STORE
    this.uiQuery.currentLangage$
      .pipe(
        takeUntil(this.onDestroy$),
        tap(language => (this.language = language))
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  openSidenav() {
    // TODO: DISPATCH OPEN SIDEBAR
    this.uiService.updateSidenavVisible(true);
  }

  closeSidenav() {
    // TODO: DISPATCH CLOSE SIDEBAR
    this.uiService.updateSidenavVisible(false);
  }

  toggleSidenav() {
    // TODO: DISPATCH TOGGLE SIDEBAR
    this.uiService.updateToggleSidenavVisible();
  }

  setLanguage(language: string) {
    // TODO: DISPATCH SET LANGUAGE
    this.uiService.updateLanguage(language);
  }
}
