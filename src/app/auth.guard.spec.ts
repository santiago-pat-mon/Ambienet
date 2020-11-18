import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [RouterTestingModule]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('Seguridad para el manejo de rutas creada y funcionando correctamente.', () => {
    expect(guard).toBeTruthy();
  });
});