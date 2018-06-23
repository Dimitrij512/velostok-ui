
import {HttpClient} from "@angular/common/http";
import {BASEURL} from "../constants/projectsConstants";
import {Injectable} from "@angular/core";

@Injectable()
export class CategoryService {
  private baseUrl: string;

  constructor(private http: HttpClient) {

    this.baseUrl = BASEURL;
  }

  getAllCategories(){
    return this.http.get(BASEURL + "/allCategories");
  }

}
