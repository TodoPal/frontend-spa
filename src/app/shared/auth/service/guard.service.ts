import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectCurrentUser } from 'src/app/state/user/user.selectors';

@Injectable({ providedIn: 'root' })
export class GuardService {
  constructor(private store: Store) {}

  canActivate(): Observable<boolean> {
    return this.store.select<string | null>(selectCurrentUser)
      .pipe(
        map(username => Boolean(username))
      );
  }
}
