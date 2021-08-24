import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { CreateadvancedpostComponent } from './createadvancedpost.component';

describe('CreateadvancedpostComponent', () => {
  let component: CreateadvancedpostComponent;
  let fixture: ComponentFixture<CreateadvancedpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, MatSnackBarModule, HttpClientTestingModule],
      providers: [FormBuilder, MatSnackBar],
      declarations: [CreateadvancedpostComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateadvancedpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Componente CreateAdvancedPost funcionando correctamente.', () => {
    expect(component).toBeTruthy();
  });
});
