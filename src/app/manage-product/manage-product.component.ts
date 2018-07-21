import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {Product} from "../models/Product";
import {ProductService} from "../services/product-service";
import {DialogConfirmDeleteComponent} from "../dialog-confirm-delete/dialog-confirm-delete.component";
import {DialogAdminProductComponent} from "../dialog-admin-product/dialog-admin-product.component";
import {SubCategory} from "../models/SubCategory";
import {SubCategoryService} from "../services/subCategory-service";

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css'],
  providers: [ProductService, SubCategoryService]
})
export class ManageProductComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['name', 'subCategoryName', 'price', 'edit', 'delete'];
  subCategories: Array<SubCategory>;
  dataSource: any;
  pageSizeOptions = [5, 10, 25, 50];
  pageSize: Number;
  length: Number;
  positionTollTip = "above";
  selectedValue: string;
  products: Array<Product>

  constructor(public productService: ProductService, public subCategoryService: SubCategoryService, public dialog: MatDialog, public dialogConfirm: MatDialog) {
  }

  ngOnInit() {
    this.subCategoryService.getAllSubCategories().subscribe(data => {
      this.subCategories = data as Array<SubCategory>
    }, this.searchErrorHandler);
  }

  public findProductsBySubCategoryId() {
    this.productService.findAllProductsBySubCategoryId(this.selectedValue).subscribe(data => this.dataHandler(data), this.searchErrorHandler);
  }

  public dataHandler(products: Array<Product>) {
    console.log(products);

    this.products = products as Array<Product>;
    this.dataSource = new MatTableDataSource(this.products);
    this.dataSource.sort = this.sort;

    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Кількість елементів на сторінці';
    this.paginator._intl.nextPageLabel = 'Наступна сторінка';
    this.paginator._intl.previousPageLabel = 'Попердня сторінка';
    this.pageSize = 5;
    this.length = this.products.length;
  }

  createProduct() {
    let product = new Product();
    const dialogRef = this.dialog.open(DialogAdminProductComponent, {
      data: product,
      minHeight: '30%',
      minWidth: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.products.push(result);
        this.products.reverse();
        this.dataHandler(this.products);
      }
    });
  };

  updateProduct(row) {
    const dialogRef = this.dialog.open(DialogAdminProductComponent, {
      data: row,
      minHeight: '30%',
      minWidth: '40%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        let index = this.products.findIndex(category => category.id == result.id);
        this.products.splice(index, 1);
        this.products.splice(index, 0, result);
        this.dataHandler(this.products);
      }
    });
  }

  openDialogConfirmRemove(row): void {
    let dialogRef = this.dialogConfirm.open(DialogConfirmDeleteComponent, {
      width: '500px',
      minWidth: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      result == 'confirm' ? this.deleteProduct(row) : 'doNothing';
    });
  }

  deleteProduct(row) {
    for (let curProduct = 0; curProduct < this.products.length; curProduct++) {
      if (row.id === this.products[curProduct].id) {
        this.products.splice(curProduct, 1);
      }
    }

    this.productService.deleteProduct(row.id);
    this.dataHandler(this.products);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public searchErrorHandler(error: any) {
    console.log(error);
    alert("Вході виконання програми виникла помилка, спробуйте пізніше");
  }

}
