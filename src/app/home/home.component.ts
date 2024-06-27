import { Component, OnInit, inject, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { BudgetService } from '../services/budget.service';
import { Product } from '../models/product';
import { PanelComponent } from '../panel/panel.component';
import { Budget } from '../models/budget';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, PanelComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products!: Product[];
  budgetForm: FormGroup = new FormGroup({});
  formValues = signal(this.budgetForm.value);

  numPages = signal(1);
  numLanguages = signal(1);

  totalPrice = signal(0);

  constructor(private productService: ProductService, private budgetService: BudgetService) { }

  ngOnInit() {
    this.products = this.productService.getProducts();

    this.products.forEach(product => {
      this.budgetForm.addControl(product.controlName, new FormControl(false));
    });

    this.budgetForm.valueChanges.subscribe(values => {
      this.formValues.set(values);
      
      if (!values['web']) {
        this.resetWebPanel();
      }

      this.updateTotalPrice();
    });
  }

  onNumPagesChange(pages: number) {
    this.numPages.set(pages);
    this.updateTotalPrice();
  }

  onNumLanguagesChange(languages: number) {
    this.numLanguages.set(languages);
    this.updateTotalPrice();
  }

  private updateTotalPrice() {
    const budget: Budget = {
      numPages: this.numPages(),
      numLanguages: this.numLanguages(),
      productSelections: this.formValues()
    };
    this.totalPrice.set(this.budgetService.calculateTotal(budget));
  }

  private resetWebPanel() {
    this.numPages.set(1);
    this.numLanguages.set(1);
  }
}
