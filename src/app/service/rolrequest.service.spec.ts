import { TestBed } from '@angular/core/testing';

import { RolrequestService } from './rolrequest.service';

describe('RolrequestService', () => {
  let service: RolrequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolrequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
