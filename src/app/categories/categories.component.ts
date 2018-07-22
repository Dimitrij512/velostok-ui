import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Category} from "../models/Category";
import {CategoryService} from "../services/category-service";
import {SuperCategoryService} from "../services/super-category-service";
import {SuperCategory} from "../models/SuperCategory";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [CategoryService, SuperCategoryService],
})
export class CategoriesComponent implements OnInit {

  categories: Array<Category>;
  superCategory:SuperCategory;
  idSuperCategory: string;


  constructor(private router: ActivatedRoute,
              private route: Router,
              public categoryService: CategoryService,
              public superCategoryService:SuperCategoryService) {
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.idSuperCategory = params['id'];
      this.superCategoryService.findSuperCategoryById(this.idSuperCategory).subscribe(superCategory => this.superCategory = superCategory);
      this.categoryService.findAllCategoriesBySuperCategoryId(this.idSuperCategory).subscribe(categories => {
        this.categories = categories;
      });
    });
  }

  truncate(str: string) {
    if (str.length < 20) {
      return str;
    } else {
      return str.substr(0, 12) + "...";
    }
  }

  findAllSubCategoriesByCategoryId(categoryId: string) {
    this.route.navigate(["subCategories/category/", categoryId]);
  }
}
