import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Category} from "../models/Category";
import {CategoryService} from "../services/category-service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers:[CategoryService],
})
export class CategoriesComponent implements OnInit {

  categories: Array<Category>;
  idSuperCategory:string;

  constructor(private router: ActivatedRoute, private route: Router,  public categoryService:CategoryService) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.idSuperCategory = params['id'];
      this.categoryService.findAllCategoriesBySuperCategoryId(this.idSuperCategory).subscribe(categories => {
        this.categories = categories;
      })
    });

  }

  truncate(str: string) {
    if (str.length < 20) {
      return str;
    } else {
      return str.substr(0, 12) + "...";
    }
  }

  findAllSubCategoriesByCategoryId(categoryId: string){
    console.log(categoryId)
    this.route.navigate(["subCategories/category/", categoryId]);
  }
}
