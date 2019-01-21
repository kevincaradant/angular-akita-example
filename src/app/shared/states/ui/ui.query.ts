import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Ui } from './ui.interface';
import { UiStore } from './ui.store';

@Injectable({ providedIn: 'root' })
export class UiQuery extends Query<Ui> {
  currentLangage$ = this.select(ui => ui.language);
  isSidenavVisible$ = this.select(ui => ui.isSidenavVisible);

  constructor(protected store: UiStore) {
    super(store);
  }
}
