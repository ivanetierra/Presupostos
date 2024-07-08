import { Component, Signal } from '@angular/core';
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
  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
    
  }

}
