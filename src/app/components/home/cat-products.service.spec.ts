import { TestBed } from '@angular/core/testing';

import { CatProductsService } from './cat-products.service';

describe('CatProductsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatProductsService = TestBed.get(CatProductsService);
    expect(service).toBeTruthy();
  });
});
