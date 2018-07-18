import {SubCategory} from "./SubCategory";

export class Category {
  id: number;
  name: string;
  description: string;
  image: string;
  path: string;
  subCategories: Array<SubCategory>;
}
