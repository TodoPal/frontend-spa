import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginUserWithJwt } from './state/user/user.actions';
import { selectCurrentUser } from './state/user/user.selectors';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  public currentUser$ = this.store.select<string | null>(selectCurrentUser);

  constructor(
    private store: Store,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    const jwtToken = this.cookieService.get('jwtToken');
    if (jwtToken) {
      this.store.dispatch(loginUserWithJwt({ jwtToken }));
    }
  }
}
