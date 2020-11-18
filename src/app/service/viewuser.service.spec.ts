import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ViewuserService } from './viewuser.service';

describe('ViewuserService', () => {
  let service: ViewuserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ViewuserService]
    });
    service = TestBed.inject(ViewuserService);
  });

  it('Servicio de Obtener todos los Usuarios creado y funcionando correctamente', () => {
    expect(service).toBeTruthy();
  });
});