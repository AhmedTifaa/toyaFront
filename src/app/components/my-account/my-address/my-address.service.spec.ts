import { TestBed } from '@angular/core/testing';

import { MyAddressService } from './my-address.service';

describe('MyAddressService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyAddressService = TestBed.get(MyAddressService);
    expect(service).toBeTruthy();
  });
});
