import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Category} from "../models/Category";
import {DialogConfirmDeleteComponent} from "../dialog-confirm-delete/dialog-confirm-delete.component";
import {SubCategory} from "../models/SubCategory";
import {DialogAdminSubCategoryComponent} from "../dialog-admin-sub-category/dialog-admin-sub-category.component";
import {SubCategoryService} from "../services/subCategory-service";
import {CategoryService} from "../services/category-service";

@Component({
  selector: 'app-manage-sub-category',
  templateUrl: './manage-sub-category.component.html',
  styleUrls: ['./manage-sub-category.component.css'],
  providers: [SubCategoryService, CategoryService]
})
export class ManageSubCategoryComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['name', 'categoryName', 'edit', 'delete'];
  subCategories: Array<SubCategory>;
  categories: Array<Category>;
  dataSource: any;
  pageSizeOptions = [5, 10, 25, 50];
  pageSize: Number;
  length: Number;
  positionTollTip = "above";
  selectedValue: string;


  constructor(public subCategoryService: SubCategoryService, public categoryService: CategoryService, public dialog: MatDialog, public dialogConfirm: MatDialog) {

  }

  ngOnInit() {
    this.subCategoryService.getAllSubCategories().subscribe(data => this.dataHandler(data), this.searchErrorHandler);
    this.categoryService.getAllCategories().subscribe(categories => this.categories = categories as Array<Category>);
  }

  public findSubCategoriesByCategoryId() {
    this.subCategoryService.findSubCategoriesByCategoryId(this.selectedValue).subscribe(data => this.dataHandler(data), this.searchErrorHandler);
  }

  public dataHandler(categories: any) {
    this.subCategories = categories as Array<SubCategory>;
    this.dataSource = new MatTableDataSource(this.subCategories);
    this.dataSource.sort = this.sort;

    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Кількість елементів на сторінці';
    this.paginator._intl.nextPageLabel = 'Наступна сторінка';
    this.paginator._intl.previousPageLabel = 'Попердня сторінка';
    this.pageSize = 5;
    this.length = this.subCategories.length;
  }

  createSubCategory() {
    const dialogRef = this.dialog.open(DialogAdminSubCategoryComponent, {
      data: new Category(),
      minHeight: '30%',
      minWidth: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.subCategories.push(result);
        this.dataHandler(this.subCategories.reverse());
      }
    });
  };

  updateSubCategory(row) {
    const dialogRef = this.dialog.open(DialogAdminSubCategoryComponent, {
      data: row,
      minHeight: '30%',
      minWidth: '40%',
      maxHeight:'90%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        let index = this.subCategories.findIndex(category => category.id == result.id);
        this.subCategories.splice(index, 1);
        this.subCategories.splice(index, 0, result);
        this.dataHandler(this.subCategories);
      }
    });
  }

  openDialogConfirmRemove(row): void {
    let dialogRef = this.dialogConfirm.open(DialogConfirmDeleteComponent, {
      width: '500px',
      minWidth: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {

      result == 'confirm' ? this.deleteCategory(row) : 'doNothing';
    });
  }

  deleteCategory(row) {
    console.log(row);
    for (let curCategory = 0; curCategory < this.subCategories.length; curCategory++) {
      if (row.id === this.subCategories[curCategory].id) {
        this.subCategories.splice(curCategory, 1);
      }
    }

    this.subCategoryService.deleteSubCategory(row.id);
    this.dataHandler(this.subCategories);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public searchErrorHandler(error: any) {
    alert("Вході виконання програми виникла помилка, спробуйте пізніше");
  }


}
