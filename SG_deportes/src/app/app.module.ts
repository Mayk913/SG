import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FromRegisterComponent } from './layout/public-layout/components/from-register/from-register.component';
import { FromLoginComponent } from './layout/public-layout/components/from-login/from-login.component';

@NgModule({
  declarations: [
    AppComponent,
    FromRegisterComponent,
    FromLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
