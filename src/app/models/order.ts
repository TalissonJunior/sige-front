import { Product } from "./product";

export class Order {
    id: number = 0; 
    price: number = 0; 
    date: Date = new Date();
    products = new Array<Product>(); 
    hasArrived: boolean = false;       
}