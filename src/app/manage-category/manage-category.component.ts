import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {CategoryService} from "../services/category-service";
import {Category} from "../models/Category";
import {DialogAdminCategoryComponent} from "../dialog-admin-category/dialog-admin-category.component";
import {DialogConfirmDeleteComponent} from "../dialog-confirm-delete/dialog-confirm-delete.component";
import {SuperCategory} from "../models/SuperCategory";
import {SuperCategoryService} from "../services/super-category-service";

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css'],
  providers: [CategoryService, SuperCategoryService]
})
export class ManageCategoryComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['name', 'superCategoryName', 'edit', 'delete'];
  categories: Array<Category>;
  superCategories: Array<SuperCategory>;
  dataSource: any;
  pageSizeOptions = [5, 10, 25, 50];
  pageSize: Number;
  length: Number;
  positionTollTip = "above";
  selectedValue: string;


  constructor(public categoryService: CategoryService, public superCategoryService: SuperCategoryService, public dialog: MatDialog, public dialogConfirm: MatDialog) {

  }

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(data => this.dataHandler(data), this.searchErrorHandler);
    this.superCategoryService.getAllSuperCategories().subscribe(superCategories => this.superCategories = superCategories);
  }

  public findCategoriesBySuperCategoryId() {
    this.categoryService.findAllCategoriesBySuperCategoryId(this.selectedValue).subscribe(data => this.dataHandler(data), this.searchErrorHandler);
  }

  public dataHandler(categories: any) {
    this.categories = categories as Array<Category>;
    this.dataSource = new MatTableDataSource(this.categories);
    this.dataSource.sort = this.sort;

    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Кількість елементів на сторінці';
    this.paginator._intl.nextPageLabel = 'Наступна сторінка';
    this.paginator._intl.previousPageLabel = 'Попердня сторінка';
    this.pageSize = 5;
    this.length = this.categories.length;
  }

  createCategory() {
    const dialogRef = this.dialog.open(DialogAdminCategoryComponent, {
      data: new Category(),
      width:'60%',
      height:'50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.categories.push(result);
        this.dataHandler(this.categories.reverse());
      }
    });
  };

  updateCategory(row) {
    const dialogRef = this.dialog.open(DialogAdminCategoryComponent, {
      data: row,
      width:'60%',
      height:'50%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        let index = this.categories.findIndex(category => category.id == result.id);
        this.categories.splice(index, 1);
        this.categories.splice(index, 0, result);
        this.dataHandler(this.categories);
      }
    });
  }

  openDialogConfirmRemove(row): void {
    let dialogRef = this.dialogConfirm.open(DialogConfirmDeleteComponent, {
      maxWidth:'90%',
      maxHeight:'30%'
    });

    dialogRef.afterClosed().subscribe(result => {

      result == 'confirm' ? this.deleteCategory(row) : 'doNothing';
    });
  }

  deleteCategory(row) {
    console.log(row);
    for (let curCategory = 0; curCategory < this.categories.length; curCategory++) {
      if (row.id === this.categories[curCategory].id) {
        this.categories.splice(curCategory, 1);
      }
    }

    this.categoryService.deleteCategory(row.id);
    this.dataHandler(this.categories);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public searchErrorHandler(error: any) {
    alert("Вході виконання програми виникла помилка, спробуйте пізніше");
  }

}
