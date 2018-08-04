import {Component, OnInit} from '@angular/core';
import {NAV_BAR_ENTRIES} from "../departments";
import {CategoryService} from "../services/category-service";
import {Category} from "../models/Category";
import {Router} from "@angular/router";
import {SuperCategory} from "../models/SuperCategory";
import {SuperCategoryService} from "../services/super-category-service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers: [SuperCategoryService]
})
export class HomePageComponent implements OnInit {
  entries: Array<SuperCategory>;
  loaded:boolean;

  constructor(private superCategoryService: SuperCategoryService, private router: Router) {
    superCategoryService.getAllSuperCategories().subscribe(categories => {
      this.entries = categories;
      this.loaded = true;
    })

  }

  ngOnInit() {
  }

  findAllCategoriesBySuperCategoryId(superCategoryId: string){
    this.router.navigate(["categories/superCategory/", superCategoryId]);
  }
}
