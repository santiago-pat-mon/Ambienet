import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateadvancedpostComponent } from './createadvancedpost.component';

describe('CreateadvancedpostComponent', () => {
  let component: CreateadvancedpostComponent;
  let fixture: ComponentFixture<CreateadvancedpostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateadvancedpostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateadvancedpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
