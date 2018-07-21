import {SubCategory} from "../models/SubCategory";
import {HttpClient} from "@angular/common/http";
import {BASEURL} from "../constants/projectsConstants";
import {Observable, of} from "rxjs/index";
import {Injectable} from "@angular/core";

@Injectable()
export class SubCategoryService {

  public subCategories: Observable<SubCategory[]> = of([]);

  constructor(private http: HttpClient) {}

  getAllSubCategories(): Observable<SubCategory[]> {
    this.subCategories =  this.http.get<SubCategory[]>(BASEURL + "/allSubCategories");
    return this.subCategories;
  }

  createSubCategory(superCategory: SubCategory): Observable<any> {
    return this.http.post(BASEURL + "/admin/subCategory", superCategory);
  }

  updateSubCategory(superCategory: SubCategory): Observable<any> {
    return this.http.put(BASEURL + "/admin/subCategory", superCategory);
  }

  deleteSubCategory(id: String) {
    this.http.delete(BASEURL + "/admin/subCategory/" + id).toPromise().catch(this.handleHttpError);
  }

  private handleHttpError(error: any) {
    alert("Щось пішло не так, спробуйте ще раз або зверніться до адміністратора. Помилка : " + error);
  }

}
