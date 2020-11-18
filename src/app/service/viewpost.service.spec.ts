import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ViewpostService } from './viewpost.service';

describe('ViewpostService', () => {
  let service: ViewpostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ViewpostService]
    });
    service = TestBed.inject(ViewpostService);
  });

  it('Servicio de Obtener todos los Post creado y funcionando correctamente', () => {
    expect(service).toBeTruthy();
  });
});