import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ShoppingCartService} from "../shopping-cart.service";
import {Product} from "../models/Product";
import {switchMap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Currency} from "../models/Currency";
import {CURRENCY_URL} from "../constants/projectsConstants";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  idProduct: string;
  public product: Product;
  loaded:boolean;
  currency:number;

  constructor(private readonly route: ActivatedRoute,
              private readonly cart: ShoppingCartService,
              private readonly http: HttpClient) {
  }

  ngOnInit() {
    this.currency = 28.00
    this.http.get<Currency>(CURRENCY_URL).subscribe(currency =>{
        this.currency = currency.USD_UAH.val;
    });

    this.route.params.subscribe(params => {
      this.idProduct = params['id'];
    });

    this.route.data.pipe(
      switchMap((data: { url: string }) =>
        this.http.get(data.url + this.idProduct)
      )
    ).subscribe((response: Product) => {
      this.loaded = true;
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

  roundingNumber(price:number, currency:number){
    let priceProduct = price * currency;

    return priceProduct.toFixed(0);
  }

}
