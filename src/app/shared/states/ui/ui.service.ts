import { Injectable } from '@angular/core';
import { UiStore } from './ui.store';

@Injectable({ providedIn: 'root' })
export class UiService {
  constructor(private uiStore: UiStore) {}

  updateLanguage(language: string) {
    this.uiStore.update(state => ({ ...state, language }));
  }

  updateIsSidenavVisible(isSidenavVisible: boolean) {
    this.uiStore.update(state => ({
      ...state,
      isSidenavVisible,
    }));
  }

  updateToggleSidenavVisible() {
    this.uiStore.update(state => ({
      ...state,
      isSidenavVisible: !state.isSidenavVisible,
    }));
  }

  updateSidenavVisible(stateSidenav) {
    this.uiStore.update(state => ({
      ...state,
      isSidenavVisible: stateSidenav,
    }));
  }
}
