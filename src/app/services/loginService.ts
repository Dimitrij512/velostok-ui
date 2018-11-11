
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {BASEURL, ROLE, AUTH_HEADER} from '../constants/projectsConstants';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {LocalStorageService} from './locastorage.service';
import {SharedService} from './sharedService';
import {DOCUMENT} from "@angular/common";
import {User} from "../models/user";
import {Inject, Injectable} from "@angular/core";
import {AuthService, FacebookLoginProvider} from "angular4-social-login";

const URLSUFFIXLOGIN: string = '/login';
const URLSUFFIXAUTHORIZATION: string = '/authority';
const HEADERCONTENTTYPE: string = 'Content-Type';
const HEADERVALUE: string = 'application/x-www-form-urlencoded';
const BODYUSERNAME: string = 'login=';
const BODYPASSWORD: string = '&password=';

@Injectable()
export class LoginService {

  constructor(private localStorageService: LocalStorageService, private sharedService: SharedService,
              private http: HttpClient, private router: Router, @Inject(DOCUMENT) private document: any,
              private authService: AuthService) {

  }

  login(login: string, password: string): Observable<boolean> {

    this.localStorageService.clearLocalStorage();

    return this.http.post(BASEURL + URLSUFFIXLOGIN, BODYUSERNAME + login + BODYPASSWORD + password,
      {headers: new HttpHeaders().append(HEADERCONTENTTYPE, HEADERVALUE), observe: 'response'})
      .map((response: HttpResponse<any>) => {
        const token = response.headers.get(AUTH_HEADER);
        if (token) {
          this.localStorageService.saveTokenToLocalStorage(token);
          this.persistUser(login).subscribe(data => {
            this.localStorageService.saveRoleToLocalStorage(data.role);
            this.http.get<User>(BASEURL + "/admin/user/" + login).subscribe(user =>{
              this.localStorageService.saveCurrentUsetToLocalStorage(user.email,user.name,user.id,user.photoUrl);
              this.sharedService.userPhoto.next(user.photoUrl);
            });
            this.moveToHomePage();
          });

          return true;
        }
        else {
          this.sharedService.IsUserLoggedIn.next(false);
          this.sharedService.IsUserAdmin.next(false);

          return false
        }
      })
  }

  logout() {
    this.localStorageService.clearLocalStorage();
    this.sharedService.IsUserLoggedIn.next(false);
    this.sharedService.IsUserAdmin.next(false);
    this.router.navigate(['/login'])
  }

  private persistUser(login: string): Observable<any> {
    return this.http.get(BASEURL + URLSUFFIXAUTHORIZATION);
  }

  private moveToHomePage(): any {

    if (localStorage.getItem(ROLE) == 'ADMIN') {

      this.sharedService.IsUserLoggedIn.next(true);
      this.sharedService.IsUserAdmin.next(true);

      this.router.navigate(['/']);
    } else if (localStorage.getItem(ROLE) == 'USER') {
      this.sharedService.IsUserLoggedIn.next(true);
      this.sharedService.IsUserAdmin.next(false);
      this.router.navigate(['/']);

    } else if (localStorage.getItem(ROLE) == 'FACEBOOK') {
      this.sharedService.IsUserLoggedIn.next(true);
      this.sharedService.IsUserAdmin.next(false);
      this.router.navigate(['/']);

    } else {
      throw new Error("No such role");
    }
  }

  facebookLogin() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);

    this.authService.authState.subscribe((user) => {
      console.log(user);
      this.http.post<User>(BASEURL + "/testUser", this.prepareUser(user)).subscribe(data => {
        this.login(data.email, user.photoUrl).subscribe(data=>{
        })
      })
    });
  }

  prepareUser(userTemp: any): User {
    let user = new User();
    user.id = userTemp.id;
    user.password = userTemp.photoUrl;
    user.email = userTemp.email;
    user.firstName = userTemp.firstName;
    user.lastName = userTemp.lastName;
    user.photoUrl = userTemp.photoUrl;
    user.role = userTemp.provider;
    user.name = userTemp.name;

    return user;
  }

}
