import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent,
    TelemedicineSessionComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { PatientsModule } from './patients/patients.module';
import { SharedModule } from './shared/shared.module';
import { TelemedicineSessionComponent } from './telemedicine/components/telemedicine-session/telemedicine-session.component';
import { UsersModule } from './users/users.module';

@NgModule({
  declarations: [
    AppComponent,
    TelemedicineSessionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AuthModule,
    PatientsModule,
    SharedModule,
    UsersModule
  ],
  providers: [],
  bootstrap: [AppComponent,
    TelemedicineSessionComponent]
})
export class AppModule { }