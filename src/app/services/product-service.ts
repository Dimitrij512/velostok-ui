import {HttpClient} from "@angular/common/http";
import {BASEURL} from "../constants/projectsConstants";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/index";
import {Product} from "../models/Product";

@Injectable()
export class ProductService {
  private baseUrl: string;

  constructor(private http: HttpClient) {

    this.baseUrl = BASEURL;
  }

  getAllProducts() {
    return this.http.get(BASEURL + "/allProducts");
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post(BASEURL + "/admin/product", product);
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put(BASEURL + "/admin/product", product);
  }

  deleteProduct(id: String) {
    this.http.delete(BASEURL + "/admin/product/" + id).toPromise().catch(this.handleHttpError);
  }

  private handleHttpError(error: any) {
    alert("Щось пішло не так, спробуйте ще раз або зверніться до адміністратора. Помилка : " + error);
  }

}
