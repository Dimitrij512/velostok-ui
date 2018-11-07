import {Injectable} from "@angular/core";
import {ROLE, LOGIN, AUTH_TOKEN, NAME, ID, PHOTO} from '../constants/projectsConstants';

@Injectable()
export class LocalStorageService {

  saveTokenToLocalStorage(token: string) {
    localStorage.setItem(AUTH_TOKEN, token);
  }

  saveRoleToLocalStorage(role: string) {
    localStorage.setItem(ROLE, role);
  }

  saveCurrentUsetToLocalStorage(login: string, name: string, id: string, photoUrl:string) {
    localStorage.setItem(LOGIN, login);
    localStorage.setItem(NAME, name);
    localStorage.setItem(ID, id);
    localStorage.setItem(PHOTO,photoUrl)
  }

  clearLocalStorage() {
    localStorage.removeItem(LOGIN);
    localStorage.removeItem(ROLE);
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(NAME);
    localStorage.removeItem(ID);
    localStorage.removeItem(PHOTO);
  }

}
