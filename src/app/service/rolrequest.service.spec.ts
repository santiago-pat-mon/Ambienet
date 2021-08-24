import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { RolRequestService } from './rolrequest.service';

describe('RolrequestService', () => {
  let service: RolRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RolRequestService]
    });
    service = TestBed.inject(RolRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
