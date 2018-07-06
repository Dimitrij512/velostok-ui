import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ShoppingCartService} from "../shopping-cart.service";
import {Product} from "../models/Product";
import {switchMap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  idProduct: string;
  public product: Product;

  constructor(private readonly route: ActivatedRoute,
              private readonly cart: ShoppingCartService,
              private readonly http: HttpClient) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idProduct = params['id'];
    });

    this.route.data.pipe(
      switchMap((data: { url: string }) =>
        this.http.get(data.url + this.idProduct)
      )
    ).subscribe((response: Product) => {
      this.product = response;
    });
  }

  public searchErrorHandler(error: any) {
    console.log(error);
    alert("Вході виконання програми виникла помилка, спробуйте пізніше");
  }

  goBack() {
    window.history.back();
  }

}