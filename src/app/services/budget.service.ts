import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Budget , Selection} from '../models/budget';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  constructor(private productService: ProductService) { }

  calculateTotal(selection: Selection): number {
    const products = this.productService.getProducts();
    let selectedProductsTotal = 0;
    if(selection.ads) selectedProductsTotal += products[0].price;
    if(selection.seo) selectedProductsTotal += products[1].price;
    if(selection.web) {
      selectedProductsTotal += products[2].price;
      const extraCost = (selection.numPages - 1 + selection.numLanguages - 1) * 30;
      selectedProductsTotal += extraCost;
    }

    console.log("products",products);

    return selectedProductsTotal;
  }

  budgets= signal<Budget[]>([]);

  addBudget(budget: Budget): void {
    this.budgets.update(budgets => [ ...budgets, { ...budget, date: new Date() } ]);
  }

  getBudgets(): Signal<Budget[]> {
    return (this.budgets)
  }

}
