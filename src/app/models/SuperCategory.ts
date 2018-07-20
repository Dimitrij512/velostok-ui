import {Category} from "./Category";

export class SuperCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  categories : Array<Category>;
}
