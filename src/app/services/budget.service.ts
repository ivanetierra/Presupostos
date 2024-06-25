import { Injectable } from '@angular/core';
import { Budget } from '../models/budget';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  constructor(private productService: ProductService) { }

  calculateTotal(budget: Budget): number {
    const products = this.productService.getProducts();
    const selectedProductsTotal = products
      .filter(product => budget.productSelections[product.controlName])
      .reduce((total, product) => total + product.price, 0);

    const extraCost = (budget.numPages - 1 + budget.numLanguages - 1) * 30;
    return selectedProductsTotal + extraCost;
  }
}
