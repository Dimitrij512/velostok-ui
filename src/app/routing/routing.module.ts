import {Routes,RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {LoginComponent} from "../login/login.component";
import {AppComponent} from "../app.component";
import {HomePageComponent} from "../home-page/home-page.component";


const appRoutes = [
  {path: "", component: HomePageComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: [],
  declarations: []
})
export class RoutingModule {
}
