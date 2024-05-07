import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { TodoReducer } from './state/todo/todo.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './state/todo/todo.effects';
import { AppState, metaReducers } from './state/app.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { SharedModule } from './shared/shared.module';
import { UserEffects } from './state/user/user.effects';
import { UserReducer } from './state/user/user.reducer';
import { NgOptimizedImage } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { BackendInterceptor } from './servicies/backend.interceptor';

@NgModule({
  declarations: [ AppComponent, PageNotFoundComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot<AppState>({
      todoState: TodoReducer,
      userState: UserReducer
    }, { metaReducers }),
    EffectsModule.forRoot([ TodoEffects, UserEffects ]),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    BrowserAnimationsModule,
    SharedModule,
    NgOptimizedImage
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BackendInterceptor,
      multi: true
    },
    CookieService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
