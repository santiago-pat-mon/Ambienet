import { TestBed } from '@angular/core/testing';

import { ViewuserService } from './viewuser.service';

describe('ViewuserService', () => {
  let service: ViewuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewuserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
