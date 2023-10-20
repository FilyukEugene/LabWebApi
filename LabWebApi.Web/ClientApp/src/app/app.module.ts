import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { HttpClientModule } from '@angular/common/http';
import { MatModule } from './core/mat.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './pages/auth-components/login/login.component';
import { RegistrationComponent } from './pages/auth-components/registration/registration.component';
import { HomeComponent } from './pages/home-components/home/home.component';
import { HeaderComponent } from './pages/app-components/header/header.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptorProvider } from './core/interceptors/auth.interceptor';
import { ErrorInterceptorProvider } from './core/interceptors/error.interceptor';

export function tokenGetter() {
  return localStorage.getItem('token');
  }

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    HeaderComponent
    ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RxReactiveFormsModule,
    HttpClientModule,
    MatModule,
    JwtModule.forRoot({
      config: {
      tokenGetter
      }
      }),
    FlexLayoutModule,
  ],
  providers: [
    AuthInterceptorProvider,
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
