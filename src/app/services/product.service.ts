import { Injectable } from '@angular/core';
import { Product, products } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor() {}

  getProducts(): Product[] {
    return products;
  }
}
