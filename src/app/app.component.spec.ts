import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  inject,
  TestBed,
} from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

import { LANGUAGES } from 'app/core/injection-tokens';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: TranslateService, useClass: TranslateMockService },
        { provide: LANGUAGES, useValue: ['en', 'fr'] },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AppComponent);
  }));

  it('should set the lang by using the one from the browser if the environment variable for that is true', inject(
    [TranslateService],
    (translateService: TranslateMockService, store: StoreMockService) => {
      spyOn(translateService, 'getBrowserLang').and.callThrough();
      spyOn(translateService, 'setDefaultLang');
      spyOn(translateService, 'use');
      spyOn(store, 'dispatch');

      // simulate that the browser is set to english by default
      translateService.browserLang = 'en';

      store.updateStore({
        ui: { language: 'en' },
      });

      // calling detectChanges for the first time will trigger the ngOnInit
      fixture.detectChanges();

      expect(translateService.setDefaultLang).toHaveBeenCalledWith('en');
      // TODO: DISPATCH ACTION CHANGE LANGUAGE

      expect(translateService.use).toHaveBeenCalledWith('en');
    }
  ));
});

@Injectable()
export class TranslateMockService {
  browserLang: string;

  getBrowserLang() {
    return this.browserLang;
  }

  setDefaultLang(defaultLang: string) {}

  use(lang: string) {}
}

@Injectable()
export class StoreMockService extends BehaviorSubject<any> {
  value: any;

  // as we extend BehaviorSubject, we have access to the `value` property
  constructor() {
    super(null);
  }

  dispatch(action: any) {}

  updateStore(state) {
    this.next(state);
  }
}
