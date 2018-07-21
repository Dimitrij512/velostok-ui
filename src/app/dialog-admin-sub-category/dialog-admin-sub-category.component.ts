import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";
import {Category} from "../models/Category";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../services/category-service";
import {SubCategoryService} from "../services/subCategory-service";
import {SubCategory} from "../models/SubCategory";

@Component({
  selector: 'app-dialog-admin-sub-category',
  templateUrl: './dialog-admin-sub-category.component.html',
  styleUrls: ['./dialog-admin-sub-category.component.css'],
  providers:[SubCategoryService, CategoryService]
})
export class DialogAdminSubCategoryComponent implements OnInit {

  public categoryForm: FormGroup;
  public categories: Category[] = [];

  constructor(public subCategoryService: SubCategoryService, public categoryService: CategoryService, public dialogCategory: MatDialogRef<DialogAdminSubCategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder, public snackBar: MatSnackBar) {

    this.createSubCategoryForm(data);

  }

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories as Array<Category>;
    })
  }

  createSubCategoryForm(data: any) {
    this.categoryForm = this.fb.group({
      categoryName: [data.categoryName],
      name: [data.name, [Validators.required, Validators.maxLength(50)]],
      description: [data.description, [Validators.required]],
      image: [data.image],
    });
  }

  submitSubCategoryForm() {
    let field = this.categoryForm.value;

    let category = new SubCategory();
    category.id = this.data.id;
    category.categoryName = field.categoryName;
    category.categoryId = this.categories.find(category => category.name == field.categoryName).id;
    category.name = field.name;
    category.description = field.description;
    category.image = field.image;

    this.createOrUpdateSubCategory(category);
  }

  createOrUpdateSubCategory(subCategory: SubCategory) {
    if (subCategory.id === undefined) {
      this.subCategoryService.createSubCategory(subCategory).subscribe(
        response => {
          this.callSnackBarMessage("Категрія успішно створена");

          subCategory.id = response.id;

          this.dialogCategory.close(subCategory);
        },
        error => this.handlePromiseError(error));
    } else {
      this.subCategoryService.updateSubCategory(subCategory).subscribe(
        response => {
          this.callSnackBarMessage("Категрія успішно оновлена");
          this.dialogCategory.close(subCategory);
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
