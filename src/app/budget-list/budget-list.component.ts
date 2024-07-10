import { Component, signal, Signal } from '@angular/core';
import { Budget } from '../models/budget';
import { BudgetService } from '../services/budget.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.scss',
})
export class BudgetListComponent {

  budgets: Signal<Budget[]> = this.budgetService.getBudgets();
  filteredBudgets = signal<Budget[]>([]);


  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {

  }

  sortByDate(): void {
    this.budgetService.sortByDate();
  }
  sortByPrice(): void {
    this.budgetService.sortByPrice();
  }
  sortByName(): void {
    this.budgetService.sortByName();
  }

  filterByName(event: any): void {
    this.budgetService.filterByName(event.target.value);
  }
}
