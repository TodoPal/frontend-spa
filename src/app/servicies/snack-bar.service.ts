import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SnackBarService {
  // private config: MatSnackBarConfig = {
  //   horizontalPosition: 'right',
  //   verticalPosition: 'top',
  //   panelClass: ''
  // };

  constructor() {}

  success(msg: string, action: string, duration?: number): void {
    // this.config.panelClass = 'success-snackbar';
    // if (duration) {
    //   this.config.duration = duration;
    // }
    // this.snackBar.open(msg, action, this.config);
  }

  error(msg: string, action: string, duration?: number): void {
    // this.config.panelClass = 'error-snackbar';
    // if (duration) {
    //   this.config.duration = duration;
    // }
    // this.snackBar.open(msg, action, this.config);
  }
}
