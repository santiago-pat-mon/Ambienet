import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

import { ViewpostComponent } from './viewpost.component';

describe('ViewpostComponent', () => {
  let component: ViewpostComponent;
  let fixture: ComponentFixture<ViewpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [MatSnackBar],
      declarations: [ViewpostComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Componente ViewPost funcionando correctamente.', () => {
    expect(component).toBeTruthy();
  });
});
