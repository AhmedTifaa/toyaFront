import { TestBed } from '@angular/core/testing';

import { MyDetailsService } from './my-details.service';

describe('MyDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyDetailsService = TestBed.get(MyDetailsService);
    expect(service).toBeTruthy();
  });
});
