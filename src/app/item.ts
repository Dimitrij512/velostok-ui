/**
 * Interface for the JSON returned for each sellabe item.
 */
export interface Item {
  id:string;
  name: string;
  title: string;
  category: string;
  categoryId:string;
  categoryName:string;
  price: number;
  description: string;
  image: string;
  largeImage: string;
}
