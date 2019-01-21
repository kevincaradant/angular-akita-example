import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Ui } from 'app/shared/states/ui/ui.interface';

export interface UiState {
  isSidenavVisible: boolean;
  language: string;
}

export function createInitialState(): UiState {
  return {
    language: 'en',
    isSidenavVisible: true,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'ui' })
export class UiStore extends Store<Ui> {
  constructor() {
    super(createInitialState());
  }
}
