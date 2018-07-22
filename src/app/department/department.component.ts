import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';

import {Item} from '../item';
import {ShoppingCartService} from '../shopping-cart.service';

interface DepartmentData {
  id: string,
  title: string;
  url: string;
}

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  title = "";
  nameOfCategory: string;
  idOfSubCategory:string;
  response: Item[];

  constructor(private readonly route: ActivatedRoute,
              private readonly http: HttpClient,
              private readonly cart: ShoppingCartService,
              private router: Router) {
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.idOfSubCategory = params['id'];
    });


    this.route.data.pipe(
      tap((data: DepartmentData) => {
        this.title = data.title;
      }),
      switchMap((data: { url: string }) =>
        this.http.get(data.url + this.idOfSubCategory)
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

}
