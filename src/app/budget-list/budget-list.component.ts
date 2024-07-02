import { Component } from '@angular/core';
import { Budget } from '../models/budget';
import { BudgetService } from '../services/budget.service';

@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [],
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.scss'
})
export class BudgetListComponent {
  budgets!: Budget[];

  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.budgets = this.budgetService.getBudgets();
  }
}
