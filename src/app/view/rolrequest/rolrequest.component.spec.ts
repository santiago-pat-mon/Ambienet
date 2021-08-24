import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

import { RolrequestComponent } from './rolrequest.component';

describe('RolrequestComponent', () => {
  let component: RolrequestComponent;
  let fixture: ComponentFixture<RolrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, MatSnackBarModule, HttpClientTestingModule],
      providers: [FormBuilder, MatSnackBar],
      declarations: [RolrequestComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Componente RolRequests funcionando correctamente.', () => {
    expect(component).toBeTruthy();
  });
});
