import {Component, OnInit} from '@angular/core';
import {NAV_BAR_ENTRIES} from "../departments";
import {CategoryService} from "../services/category-service";
import {Category} from "../models/Category";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [CategoryService]
})
export class HomePageComponent implements OnInit {
  entries: Array<Category>;

  constructor(private categoryService: CategoryService, private router: Router) {
    categoryService.getAllCategories().subscribe(categories => {
      this.entries = categories as Array<Category>;
    })

  }

  ngOnInit() {
  }

  findAllProductByCategoryName(categoryName: string){
    this.router.navigate(["products/category/", categoryName]);
  }

}
