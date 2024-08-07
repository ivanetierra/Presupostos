import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

   private products = [
    {
      title: 'Seo',
      description: 'Programació duna web responsive completa',
      price: 300,
      controlName: 'seo',
    },
    {
      title: 'Ads',
      description: 'Programació duna web responsive completa',
      price: 400,
      controlName: 'ads',
    },
    {
      title: 'Web',
      description: 'Programació duna web responsive completa',
      price: 500,
      controlName: 'web',
    },
  ];

  constructor() {}

  getProducts(): Product[] {
    return this.products;
  }
}
