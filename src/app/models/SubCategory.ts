
import {Product} from "./Product";

export class SubCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  category:string;
  categoryName:string;
  categoryId:string;
  products : Array<Product>;
}
