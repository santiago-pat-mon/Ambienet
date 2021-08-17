import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolrequestComponent } from './rolrequest.component';

describe('RolrequestComponent', () => {
  let component: RolrequestComponent;
  let fixture: ComponentFixture<RolrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
