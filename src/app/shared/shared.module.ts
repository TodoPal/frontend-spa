import { NgModule } from '@angular/core';
import { BackgroundComponent } from './background/background.component';
import { MyInputComponent } from './my-input/my-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterLink } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { heroEye, heroEyeSlash } from '@ng-icons/heroicons/outline';
import { heroBellSolid, heroBellAlertSolid } from '@ng-icons/heroicons/solid';

@NgModule({
  exports: [ BackgroundComponent, MyInputComponent, HeaderComponent ],
  declarations: [ BackgroundComponent, MyInputComponent, HeaderComponent ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    NgIconsModule.withIcons({ heroEye, heroEyeSlash, heroBellSolid, heroBellAlertSolid })
  ]
})
export class SharedModule { }
