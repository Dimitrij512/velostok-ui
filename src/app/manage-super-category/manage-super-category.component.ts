import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {DialogConfirmDeleteComponent} from "../dialog-confirm-delete/dialog-confirm-delete.component";
import {SuperCategoryService} from "../services/super-category-service";
import {SuperCategory} from "../models/SuperCategory";
import {DialogAdminSuperCategoryComponent} from "../dialog-admin-super-category/dialog-admin-super-category.component";

@Component({
  selector: 'app-manage-super-category',
  templateUrl: './manage-super-category.component.html',
  styleUrls: ['./manage-super-category.component.css'],
  providers: [SuperCategoryService]
})
export class ManageSuperCategoryComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['name', 'edit', 'delete'];
  categories: Array<SuperCategory>;
  dataSource: any;
  pageSizeOptions = [5, 10, 25, 50];
  pageSize: Number;
  length:Number;
  positionTollTip = "above";

  constructor(public categoryService: SuperCategoryService, public dialog: MatDialog, public dialogConfirm: MatDialog) {

  }

  ngOnInit() {
    this.categoryService.getAllSuperCategories().subscribe(data => this.dataHandler(data), this.searchErrorHandler);
  }

  public dataHandler(categories: any) {
    this.categories = categories as Array<SuperCategory>;
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
    const dialogRef = this.dialog.open(DialogAdminSuperCategoryComponent, {
      data: new SuperCategory(),
      minHeight: '30%',
      minWidth: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.categories.push(result);
        this.dataHandler(this.categories.reverse());
      }
    });
  };

  updateCategory(row) {
    const dialogRef = this.dialog.open(DialogAdminSuperCategoryComponent, {
      data: row,
      minHeight: '30%',
      minWidth: '40%'
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
      width: '500px',
      minWidth:'500px'
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

    this.categoryService.deleteSuperCategory(row.id);
    this.dataHandler(this.categories);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public searchErrorHandler(error: any) {
    alert("Вході виконання програми виникла помилка, спробуйте пізніше");
  }

}
