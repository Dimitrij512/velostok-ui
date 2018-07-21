import {HttpClient} from "@angular/common/http";
import {BASEURL} from "../constants/projectsConstants";
import {Injectable} from "@angular/core";
import {Category} from "../models/Category";
import {Observable, of} from "rxjs/index";
import {SuperCategory} from "../models/SuperCategory";
import {SubCategory} from "../models/SubCategory";

@Injectable()
export class CategoryService {
  private baseUrl: string;

  constructor(private http: HttpClient) {

    this.baseUrl = BASEURL;
  }

  getAllCategories() {
    return this.http.get(BASEURL + "/allCategories");
  }

  getAllSuperCategories(): Promise<any> {
    return this.http.get(BASEURL + "/allSuperCategories").toPromise();
  }


  findCategoryById(id: String): Observable<Category> {
    return this.http.get<Category>(BASEURL + "/category/" + id);
  }

  findAllCategoriesBySuperCategoryId(id: String): Observable<Category[]> {
    return this.http.get<Category[]>(BASEURL + "/category/superCategory/" + id);
  }

  createCategory(category: Category): Observable<any> {
    return this.http.post(BASEURL + "/admin/category", category);
  }

  updateCategory(category: Category): Observable<any> {
    return this.http.put(BASEURL + "/admin/category", category);
  }

  deleteCategory(id: String) {
    this.http.delete(BASEURL + "/admin/category/" + id).toPromise().catch(this.handleHttpError);
  }

  private handleHttpError(error: any) {
    alert("Щось пішло не так, спробуйте ще раз або зверніться до адміністратора. Помилка : " + error);
  }

}
