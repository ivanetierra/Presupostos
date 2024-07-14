import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ProductService } from '../services/product.service';
import { BudgetService } from '../services/budget.service';
import { Product } from '../models/product';
import { PanelComponent } from '../panel/panel.component';
import { Budget, Selection } from '../models/budget';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, PanelComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products!: Product[];
  budgetForm: FormGroup = new FormGroup({});

  totalPrice = signal(0);

  budgetInfo = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]+'),
      Validators.minLength(9),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private productService: ProductService,
    private budgetService: BudgetService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.products.forEach((product) => {
      this.budgetForm.addControl(product.controlName, new FormControl(false));
      if (product.controlName === 'web') {
        this.budgetForm.addControl('numPages', new FormControl(1));
        this.budgetForm.addControl('numLanguages', new FormControl(1));
      }
    });

    this.budgetForm.controls['web'].valueChanges.subscribe((value) => {
      if (!value) {
        this.resetWebPanel();
      }
      this.updateTotalPrice();
    });
  }

  changeCheckboxValue(control: string) {
    const checkbox = this.budgetForm.controls[control];
    checkbox.setValue(!checkbox.value);
    this.updateTotalPrice();
  }
  onNumPagesChange(pages: number) {
    this.budgetForm.controls['numPages'].setValue(pages);
    this.updateTotalPrice();
  }

  onNumLanguagesChange(languages: number) {
    this.budgetForm.controls['numLanguages'].setValue(languages);
    this.updateTotalPrice();
  }

  private updateTotalPrice() {
    const selection: Selection = {
      numPages: this.budgetForm.controls['numPages'].value || 1,
      numLanguages: this.budgetForm.controls['numLanguages'].value || 1,
      seo: this.budgetForm.controls['seo'].value || false,
      web: this.budgetForm.controls['web'].value || false,
      ads: this.budgetForm.controls['ads'].value || false,
    };
    this.totalPrice.set(this.budgetService.calculateTotal(selection));
    this.updateUrl();
  }

  private resetWebPanel() {
    this.budgetForm.controls['numLanguages'].setValue(1);
    this.budgetForm.controls['numPages'].setValue(1);
  }

  addBudget(): void {
    this.budgetInfo.markAllAsTouched();
    if (!this.budgetInfo.valid) {
      return;
    }
    const budget: Budget = {
      contact: {
        name: this.budgetInfo.value.name!,
        phone: this.budgetInfo.value.phone!,
        email: this.budgetInfo.value.email!,
      },
      selection: this.budgetForm.value as Selection,
      total: this.totalPrice(),
    };
    this.budgetService.addBudget(budget);
  }

  updateUrl() {
    const params: any = {};
    if (this.budgetForm.controls['seo'].value) {
      params['seo'] = 'true';
    } else {
      params['seo'] = null;
    }
    if (this.budgetForm.controls['ads'].value) {
      params['ads'] = 'true';
    } else {
      params['ads'] = null;
    }
    if (this.budgetForm.controls['web'].value) {
      params['web'] = 'true';
      if (this.budgetForm.controls['numLanguages'].value) {
        params['numLanguages'] = Number(this.budgetForm.controls['numLanguages'].value);
      }
      if (this.budgetForm.controls['numPages'].value) {
        params['numPages'] = Number(this.budgetForm.controls['numPages'].value);
      }
    } else {
      params['web'] = null;
      params['numLanguages'] = null;
      params['numPages'] = null;
    }
    this.router.navigate([], {
      queryParams: params,
      relativeTo: this.route,
      queryParamsHandling: 'merge',
    });
  }
}

