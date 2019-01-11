import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../services/product-service";
import {Product} from "../models/Product";
import {CategoryService} from "../services/category-service";
import {Category} from "../models/Category";
import {GOOGLE_DISK_URL} from "../constants/projectsConstants";

@Component({
  selector: 'app-dialog-admin-product',
  templateUrl: './dialog-admin-product.component.html',
  styleUrls: ['./dialog-admin-product.component.css'],
  providers: [ProductService, CategoryService]
})
export class DialogAdminProductComponent implements OnInit {

  public productForm: FormGroup;
  public categories: Array<Category>;

  constructor(public productService: ProductService, public categoryService: CategoryService, public dialogProduct: MatDialogRef<DialogAdminProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder, public snackBar: MatSnackBar) {

    this.categoryService.getAllCategories().subscribe(categories => this.categories = categories as Array<Category>);

    this.createProductForm(data);
  }

  ngOnInit() {}

  createProductForm(data: any) {
    this.productForm = this.fb.group({
      name: [data.name, [Validators.required, Validators.maxLength(50)]],
      title: [data.title, [Validators.required]],
      categoryName: [data.categoryName],
      price: [data.price],
      description: [data.description],
      image: [data.image],
      largeImage: [data.largeImage],
      available:[data.available]
    })
  }

  submitProductForm() {
    let field = this.productForm.value;

    if(this.isStringMatch(field.image, 'drive.google.com')) {
      field.image = GOOGLE_DISK_URL + this.retrieveGoogleID(field.image);
      field.largeImage = GOOGLE_DISK_URL + this.retrieveGoogleID(field.largeImage);
    }

    let product = new Product();
    product.id = this.data.id;
    product.name = field.name;
    product.title = field.title;
    product.categoryName = field.categoryName;
    product.categoryId = this.categories.find(category => category.name == field.categoryName).id;
    product.price = field.price;
    product.description = field.description;
    product.image = field.image;
    product.largeImage = field.largeImage;
    product.available = field.available;

    this.createOrUpdateProduct(product);
  }

  isStringMatch(str: string, str_to_match: string): boolean {
    return (str.indexOf(str_to_match) > -1);
  }

  retrieveGoogleID(input: string): string {
    return input.split('?id=').pop();
  }

  createOrUpdateProduct(product: Product) {
    console.log(product);
    if (product.id === undefined) {
      this.productService.createProduct(product).subscribe(
        response => {
          this.callSnackBarMessage("Товар успішно створений");

          product.id = response.id;

          this.dialogProduct.close(product);
        },
        error => this.handlePromiseError(error));
    } else {
      this.productService.updateProduct(product).subscribe(
        response => {
          this.callSnackBarMessage("Продукт успішно оновлений");
          this.dialogProduct.close(product);
        },
        error => this.handlePromiseError(error));
    }
  }

  callSnackBarMessage(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  public handlePromiseError(err): void {
    alert('Щось пішло не так, повторіть спробу пізніше : ' + err.status);
  }


}
