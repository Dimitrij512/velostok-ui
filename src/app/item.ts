/**
 * Interface for the JSON returned for each sellabe item.
 */
export interface Item {
  id:string;
  name: string;
  title: string;
  categoryId:string;
  categoryName:string;
  available:boolean;
  price: number;
  description: string;
  image: string;
  largeImage: string;
}
