
import {Product} from "./Product";

export class SubCategory {
  id: number;
  name: string;
  description: string;
  image: string;
  category:string;
  products : Array<Product>;
}
