import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Budget, Selection } from '../models/budget';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  constructor(private productService: ProductService) { }

  calculateTotal(selection: Selection): number {
  const products = this.productService.getProducts();
  let selectedProductsTotal = 0;
  if (selection.seo) selectedProductsTotal += products[0].price;
  if (selection.ads) selectedProductsTotal += products[1].price;
  if (selection.web) {
    selectedProductsTotal += products[2].price;
    const extraCost = (selection.numPages - 1 + selection.numLanguages - 1) * 30;
    selectedProductsTotal += extraCost;
  }

    return selectedProductsTotal;
}

  budgets = signal<Budget[]>([]);
  originalBudgets = signal<Budget[]>([]);
  originalBudgets$ = this.budgets;

  addBudget(budget: Budget): void {
    const newBudget = { ...budget, date: new Date() };
    this.budgets.update(budgets => [ ...budgets, newBudget ]);
    this.originalBudgets.update(budgets => [ ...budgets, newBudget ]);
  }

  getBudgets(): Signal<Budget[]> {
    return this.budgets;
  }

  sortByDate(): void {
    this.budgets.update(budgets => budgets.sort((a, b) => b.date!.getTime() - a.date!.getTime()));
  }

  sortByPrice(): void {
    this.budgets.update(budgets => budgets.sort((a, b) => b.total! - a.total!));
  }

  sortByName(): void {
    this.budgets.update(budgets => budgets.sort((a, b) => a.contact.name!.localeCompare(b.contact.name!)));
  }

  filterByName(searchTerm: string): void {
    const lowerCaseSearchTerm = searchTerm.trim().toLowerCase();
    if (!lowerCaseSearchTerm) {
      this.budgets.set(this.originalBudgets());
      return;
    }

    this.budgets.update(budgets => this.originalBudgets().filter(budget =>
      budget.contact.name!.toLowerCase().includes(lowerCaseSearchTerm)
    ));
  }
}
