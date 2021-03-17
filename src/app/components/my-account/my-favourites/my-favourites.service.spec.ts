import { TestBed } from '@angular/core/testing';

import { MyFavouritesService } from './my-favourites.service';

describe('MyFavouritesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyFavouritesService = TestBed.get(MyFavouritesService);
    expect(service).toBeTruthy();
  });
});
