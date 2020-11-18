import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule } from "@angular/forms";
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CreatepostComponent } from './createpost.component';

describe('CreatepostComponent', () => {
  let component: CreatepostComponent;
  let fixture: ComponentFixture<CreatepostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, MatSnackBarModule, HttpClientTestingModule],
      providers: [FormBuilder, MatSnackBar],
      declarations: [CreatepostComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatepostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Componente CreatePost funcionando correctamente.', () => {
    expect(component).toBeTruthy();
  });
});
