import {Component, OnInit} from '@angular/core';
import {NAV_BAR_ENTRIES} from "../departments";
import {Router} from "@angular/router";
import {SharedService} from "../services/sharedService";
import {LoginService} from "../services/loginService";
import {AUTH_TOKEN, PHOTO, ROLE} from "../constants/projectsConstants";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers:[LoginService]
})
export class MenuComponent implements OnInit {

  entries: any;

  public isLogin = localStorage.getItem(AUTH_TOKEN) !== null;
  public isAdmin = localStorage.getItem(ROLE) === 'ADMIN';
  public photoUser = localStorage.getItem(PHOTO);


  constructor(public router: Router, public sharedService: SharedService, public loginService: LoginService) {

    this.sharedService.IsUserLoggedIn.subscribe(value => {
      this.isLogin = value;
    });

    this.sharedService.IsUserAdmin.subscribe(value => {
      this.isAdmin = value;
    });

  }

  ngOnInit() {
    this.entries = NAV_BAR_ENTRIES;
  }

  goToAdminPage(routToAdminPage: string) {
    this.router.navigate([routToAdminPage]);
  }

  logout(){
    this.loginService.logout();
  }

}
