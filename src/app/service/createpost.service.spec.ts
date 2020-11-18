import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CreatepostService } from './createpost.service';

describe('CreatepostService', () => {
  let service: CreatepostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CreatepostService]
    });
    service = TestBed.inject(CreatepostService);
  });

  it('Servicio de los Posts creado y funcionando correctamente', () => {
    expect(service).toBeTruthy();
  });
});
