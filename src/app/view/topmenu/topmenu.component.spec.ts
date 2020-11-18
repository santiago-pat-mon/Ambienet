import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TopmenuComponent } from './topmenu.component';

describe('TopmenuComponent', () => {
  let component: TopmenuComponent;
  let fixture: ComponentFixture<TopmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TopmenuComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Componente TopMenu funcionando correctamente.', () => {
    expect(component).toBeTruthy();
  });
});
