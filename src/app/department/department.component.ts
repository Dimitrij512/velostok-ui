import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';

import {Item} from '../item';
import {ShoppingCartService} from '../shopping-cart.service';
import {CategoryService} from "../services/category-service";

interface DepartmentData {
  id: string,
  title: string;
  url: string;
}

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
  providers:[CategoryService]
})
export class DepartmentComponent implements OnInit {
  title = "";
  nameOfCategory: string;
  idCategory:string;
  response: Item[];
  filter:string;

  constructor(private readonly route: ActivatedRoute,
              private readonly http: HttpClient,
              private readonly cart: ShoppingCartService,
              private readonly categoryService:CategoryService,
              private router: Router) {
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.idCategory = params['id'];
      this.categoryService.findCategoryById(this.idCategory).subscribe(category => this.nameOfCategory = category.name);
    });


    this.route.data.pipe(
      tap((data: DepartmentData) => {
        this.title = data.title;
      }),
      switchMap((data: { url: string }) =>
        this.http.get(data.url + this.idCategory)
      )
    ).subscribe((response: Item[]) => {
      this.response = response;
    });
  }

  truncate(str: string) {
    if (str.length < 20) {
      return str;
    } else {
      return str.substr(0, 12) + "...";
    }
  }

  addToCart(entry: Item) {
    this.cart.add(entry);
  }

  getProduct(idProduct: string) {
    this.router.navigate(["product", idProduct]);
  }

  //sorting
  key: string = 'name';
  reverse: boolean = false;
  sort(key){
    this.key = key;
    this.reverse = !this.reverse;
  }
  p: number = 1;

  messageIsAvailable(status: boolean){
    return status == true ? 'в наявності' : '';
  }

}
