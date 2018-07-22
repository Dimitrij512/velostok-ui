import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SubCategoryService} from "../services/subCategory-service";
import {SubCategory} from "../models/SubCategory";

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.css'],
  providers:[SubCategoryService]
})
export class SubCategoriesComponent implements OnInit {

  subCategories: Array<SubCategory>;
  idSuperCategory:string;

  constructor(private router: ActivatedRoute, private route: Router,  public subCategoryService:SubCategoryService) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.idSuperCategory = params['id'];
      this.subCategoryService.findSubCategoriesByCategoryId(this.idSuperCategory).subscribe(subCategories => {
        this.subCategories = subCategories;
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


  findAllProductBySubCategoryId(subCategoryId: string) {
    this.route.navigate(["products/subCategory/", subCategoryId]);
  }

}
