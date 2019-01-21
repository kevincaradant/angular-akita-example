import { Injectable } from '@angular/core';
import { UserDetails } from './session.interface';
import { SessionStore } from './session.store';

@Injectable({ providedIn: 'root' })
export class SessionService {
  constructor(private sessionStore: SessionStore) {}

  updateUser(user: UserDetails) {
    this.sessionStore.update(state => ({
      ...state,
      userDetails: {
        ...state.user,
        user,
      },
    }));
  }

  updateToken(token: string) {
    this.sessionStore.update(state => ({
      ...state,
      token,
    }));
  }
}
