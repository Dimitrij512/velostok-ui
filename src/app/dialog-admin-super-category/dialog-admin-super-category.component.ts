import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SuperCategoryService} from "../services/super-category-service";
import {SuperCategory} from "../models/SuperCategory";

@Component({
  selector: 'app-dialog-admin-super-category',
  templateUrl: './dialog-admin-super-category.component.html',
  styleUrls: ['./dialog-admin-super-category.component.css'],
  providers: [SuperCategoryService]
})
export class DialogAdminSuperCategoryComponent implements OnInit {


  public categoryForm: FormGroup;

  constructor(public categoryService: SuperCategoryService, public dialogCategory: MatDialogRef<DialogAdminSuperCategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder, public snackBar: MatSnackBar) {

    this.createCategoryForm(data);
  }

  ngOnInit() {}

  createCategoryForm(data: any) {
    this.categoryForm = this.fb.group({
      name: [data.name, [Validators.required, Validators.maxLength(50)]],
      description: [data.description, [Validators.required]],
      image: [data.image],
    })
  }

  submitCategoryForm() {
    let field = this.categoryForm.value;

    let category = new SuperCategory();
    category.id = this.data.id;
    category.name = field.name;
    category.description = field.description;
    category.image = field.image;

    this.createOrUpdateCategory(category);
  }

  createOrUpdateCategory(category: SuperCategory) {
    if (category.id === undefined) {
      this.categoryService.createSuperCategory(category).subscribe(
        response => {
          this.callSnackBarMessage("Категрія успішно створена");

          category.id = response.id;

          this.dialogCategory.close(category);
        },
        error => this.handlePromiseError(error));
    } else {
      this.categoryService.updateSuperCategory(category).subscribe(
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
