import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {CategoryService} from "../services/category-service";
import {Category} from "../models/Category";

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css'],
  providers: [CategoryService]
})
export class ManageCategoryComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['name', 'description', 'image'];
  categories: Array<Category>;
  dataSource: any;
  pageSizeOptions = [5, 10, 25, 50];
  pageSize: Number;
  length:Number;

  constructor(public categoryService: CategoryService,) {
    categoryService.getAllCategories().subscribe(data => this.dataHandler(data), this.searchErrorHandler);
  }

  ngOnInit() {}

  public dataHandler(categories: any) {
    console.log(categories);
    this.categories = categories as Array<Category>;
    this.dataSource = new MatTableDataSource(this.categories);

    console.log(this.dataSource);

    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Кількість елементів на сторінці';
    this.paginator._intl.nextPageLabel = 'Наступна сторінка';
    this.paginator._intl.previousPageLabel = 'Попердня сторінка';
    this.pageSize = 5;
    this.length = this.categories.length;

  }

  public searchErrorHandler(error: any) {
    alert("Вході виконання програми виникла помилка, спробуйте пізніше. Тип помилки : " + error);
  }

}
