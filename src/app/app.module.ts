import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {FormsModule} from "@angular/forms";
import {RoutingModule} from "./routing/routing.module";
import {HomePageComponent} from './home-page/home-page.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CartIconComponent} from "./cart-icon/cart-icon.component";
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http'
import {
  MatBadgeModule,
  MatButtonModule, MatCardModule,
  MatIconModule,
  MatListModule,
  MatMenuModule, MatSidenavModule,
  MatToolbarModule
} from "@angular/material";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    CartIconComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
