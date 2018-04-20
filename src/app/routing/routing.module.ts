import {Routes,RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {LoginComponent} from "../login/login.component";
import {AppComponent} from "../app.component";


const appRoutes = [
  {path: "", component: AppComponent},
  {path: 'login', component: LoginComponent}
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
