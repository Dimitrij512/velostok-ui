import {HttpClient} from "@angular/common/http";
import {BASEURL} from "../constants/projectsConstants";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs/index";
import {SuperCategory} from "../models/SuperCategory";

@Injectable()
export class SuperCategoryService {
  private baseUrl: string;

  constructor(private http: HttpClient) {

    this.baseUrl = BASEURL;
  }

  getAllSuperCategories(): Observable<SuperCategory[]> {
    return this.http.get<SuperCategory[]>(BASEURL + "/allSuperCategories");
  }

  createSuperCategory(superCategory: SuperCategory): Observable<any> {
    return this.http.post(BASEURL + "/admin/superCategory", superCategory);
  }

  updateSuperCategory(superCategory: SuperCategory): Observable<any> {
    return this.http.put(BASEURL + "/admin/superCategory", superCategory);
  }

  findSuperCategoryById(id:string):Observable<SuperCategory>{
    return this.http.get<SuperCategory>(BASEURL + "/superCategory/" + id);
  }

  deleteSuperCategory(id: String) {
    this.http.delete(BASEURL + "/admin/superCategory/" + id).toPromise().catch(this.handleHttpError);
  }

  private handleHttpError(error: any) {
    alert("Щось пішло не так, спробуйте ще раз або зверніться до адміністратора. Помилка : " + error);
  }

}
