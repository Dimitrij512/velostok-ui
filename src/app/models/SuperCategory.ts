import {Category} from "./Category";

export class SuperCategory {
  id: number;
  name: string;
  description: string;
  image: string;
  categories : Array<Category>;
}
