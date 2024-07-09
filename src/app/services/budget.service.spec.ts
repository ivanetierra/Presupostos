import { TestBed } from '@angular/core/testing';
import { BudgetService } from './budget.service';
import { Selection } from '../models/budget';

describe('BudgetService', () => {
  let service: BudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate the budget correctly when all services are selected', () => {
    const selection : Selection = {
      numPages: 1,
      numLanguages: 1,
      seo: true,
      web: true,
      ads: true
    };
    const result = service.calculateTotal(selection);
    expect(result).toBe(1200);
  });
});

