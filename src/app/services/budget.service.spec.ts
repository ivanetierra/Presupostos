import { TestBed } from '@angular/core/testing';
import { BudgetService } from './budget.service';

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
    const budget = {
      productSelections: { seo: true, add: true, web: true },
      numPages: 1,
      numLanguages: 1
    };
    const result = service.calculateTotal(budget);
    expect(result).toBe(500);
  });
});

