import { TestBed } from '@angular/core/testing';

import { ViewpostService } from './viewpost.service';

describe('ViewpostService', () => {
  let service: ViewpostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewpostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
