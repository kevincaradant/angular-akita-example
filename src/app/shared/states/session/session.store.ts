import { Injectable } from '@angular/core';
import { EntityState, EntityStore, Store, StoreConfig } from '@datorama/akita';
import {
  Session,
  UserDetails,
} from 'app/shared/states/session/session.interface';

export interface SessionState {
  token: string;
  user: UserDetails;
}

export function createInitialState(): SessionState {
  return {
    token: Math.random().toString(20),
    user: null,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<Session> {
  constructor() {
    super(createInitialState());
  }
}
