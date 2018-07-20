import {SubCategory} from "./SubCategory";

export class Category {
  id: string;
  name: string;
  description: string;
  image: string;
  path: string;
  superCategoryName:string;
  superCategoryId:string;
  subCategories: Array<SubCategory>;
}
