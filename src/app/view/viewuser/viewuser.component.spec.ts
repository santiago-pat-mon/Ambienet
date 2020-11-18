import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

import { ViewuserComponent } from './viewuser.component';

describe('ViewuserComponent', () => {
  let component: ViewuserComponent;
  let fixture: ComponentFixture<ViewuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [MatSnackBar],
      declarations: [ViewuserComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Componente ViewUser funcionando correctamente.', () => {
    expect(component).toBeTruthy();
  });
});
