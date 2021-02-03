import { TestBed } from '@angular/core/testing';

import { RecentProductsService } from './recent-products.service';

describe('RecentProductsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecentProductsService = TestBed.get(RecentProductsService);
    expect(service).toBeTruthy();
  });
});
