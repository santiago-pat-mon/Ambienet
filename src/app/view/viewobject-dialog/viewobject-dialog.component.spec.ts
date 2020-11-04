import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewobjectDialogComponent } from './viewobject-dialog.component';

describe('ViewobjectDialogComponent', () => {
  let component: ViewobjectDialogComponent;
  let fixture: ComponentFixture<ViewobjectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewobjectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewobjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
