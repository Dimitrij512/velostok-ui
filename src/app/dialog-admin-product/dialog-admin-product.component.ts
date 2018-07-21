import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../services/product-service";
import {Product} from "../models/Product";
import {SubCategoryService} from "../services/subCategory-service";
import {SubCategory} from "../models/SubCategory";

@Component({
  selector: 'app-dialog-admin-product',
  templateUrl: './dialog-admin-product.component.html',
  styleUrls: ['./dialog-admin-product.component.css'],
  providers: [ProductService, SubCategoryService]
})
export class DialogAdminProductComponent implements OnInit {

  public productForm: FormGroup;
  public subCategories: Array<SubCategory>;

  constructor(public productService: ProductService, public subCategoryService: SubCategoryService, public dialogProduct: MatDialogRef<DialogAdminProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder, public snackBar: MatSnackBar) {

    this.subCategoryService.getAllSubCategories().subscribe(subCategories => this.subCategories = subCategories as Array<SubCategory>);

    this.createProductForm(data);
  }

  ngOnInit() {
  }

  createProductForm(data: any) {
    this.productForm = this.fb.group({
      name: [data.name, [Validators.required, Validators.maxLength(50)]],
      title: [data.title, [Validators.required]],
      subCategoryName: [data.subCategoryName],
      price: [data.price],
      description: [data.description],
      image: [data.image],
      largeImage: [data.largeImage],
    })
  }

  submitProductForm() {
    let field = this.productForm.value;
    console.log(field);

    let product = new Product();
    product.id = this.data.id;
    product.name = field.name;
    product.title = field.title;
    product.subCategoryName = field.subCategoryName;
    product.subCategoryId =this.subCategories.find(subcategory => subcategory.name == field.subCategoryName).id;
    product.price = field.price;
    product.description = field.description;
    product.image = field.image;
    product.largeImage = field.largeImage;

    this.createOrUpdateProduct(product);
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
