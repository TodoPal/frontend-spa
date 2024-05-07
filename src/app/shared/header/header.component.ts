import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { logoutUser } from '../../state/user/user.actions';
import { selectCurrentUser } from '../../state/user/user.selectors';
import { Notification } from '../../entities/notification.model';
import { Router } from '@angular/router';
import { NotificationService } from '../../servicies/notification.service';
import { interval, map, Observable, of, pairwise, startWith, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  public currentUser$ = this.store.select<string | null>(selectCurrentUser);
  public notifications$: Observable<Notification[]> = of([]);
  public isNewNotification = false;

  constructor(private store: Store, private router: Router, protected notificationService: NotificationService) {
    this.notifications$ = interval(10000).pipe(
      startWith(0),
      takeUntilDestroyed(),
      switchMap(() => this.currentUser$),
      switchMap(username => this.notificationService.getNotificationsForUser(username ?? '')),
      pairwise(),
      map(([ oldVal, newVal ]) => {
        if (newVal.length > oldVal.length) {
          this.isNewNotification = true;
        }
        return newVal;
      })
    );
  }

  logout(): void {
    console.log('Logging out');
    this.store.dispatch(logoutUser());
  }

  toggleNotification(notification: Notification): void {
    notification.seen = !notification.seen;
    this.notificationService.toggleNotification(notification.id);
  }

  navigateToTodoPage(todoId: string): void {
    this.router.navigate([ '/todos/', todoId ]).catch(err => console.log(err));
  }
}
