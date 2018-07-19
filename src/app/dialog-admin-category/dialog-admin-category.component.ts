import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category} from "../models/Category";
import {CategoryService} from "../services/category-service";
import {SuperCategoryService} from "../services/super-category-service";
import {SuperCategory} from "../models/SuperCategory";

@Component({
  selector: 'app-dialog-admin-category',
  templateUrl: './dialog-admin-category.component.html',
  styleUrls: ['./dialog-admin-category.component.css'],
  providers: [CategoryService, SuperCategoryService]
})
export class DialogAdminCategoryComponent implements OnInit {

  public categoryForm: FormGroup;
  public superCategories: SuperCategory[] = [];

  constructor(public categoryService: CategoryService, public superCategoryService:SuperCategoryService, public dialogCategory: MatDialogRef<DialogAdminCategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder, public snackBar: MatSnackBar) {


    this.superCategoryService.getAllSuperCategories();
    this.createCategoryForm(data);
  }
  ngOnInit() {
  }

  createCategoryForm(data: any) {
    console.log(this.superCategories);
    this.categoryForm = this.fb.group({
      name: [data.name, [Validators.required, Validators.maxLength(50)]],
      description: [data.description, [Validators.required]],
      image: [data.image],
    })
  }

  submitCategoryForm() {
    let field = this.categoryForm.value;

    let category = new Category();
    category.id = this.data.id;
    category.name = field.name;
    category.description = field.description;
    category.image = field.image;

    this.createOrUpdateCategory(category);
  }

  createOrUpdateCategory(category: Category) {
    if (category.id === undefined) {
      this.categoryService.createCategory(category).subscribe(
        response => {
          this.callSnackBarMessage("Категрія успішно створена");

          category.id = response.id;

          this.dialogCategory.close(category);
        },
        error => this.handlePromiseError(error));
    } else {
      this.categoryService.updateCategory(category).subscribe(
        response => {
          this.callSnackBarMessage("Категрія успішно оновлена");
          this.dialogCategory.close(category);
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
