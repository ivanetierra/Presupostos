import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts(): Product[] {

    return [
      {
        title: 'Seo',
        description: 'Programació duna web responsive completa',
        price: 300,
        controlName: 'seo'
      },
      {
        title: 'Ads',
        description: 'Programació duna web responsive completa',
        price: 400,
        controlName: 'ads'
      },
      {
        title: 'Web',
        description: 'Programació duna web responsive completa',
        price: 500,
        controlName: 'web'
      }
    ]
  }
}
