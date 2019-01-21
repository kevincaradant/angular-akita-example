import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Session } from './session.interface';
import { SessionStore } from './session.store';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<Session> {
  isLogged$ = this.select(session => !!session.token);

  constructor(protected store: SessionStore) {
    super(store);
  }
}
