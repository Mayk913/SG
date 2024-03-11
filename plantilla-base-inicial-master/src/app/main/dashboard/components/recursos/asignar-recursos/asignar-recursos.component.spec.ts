import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarRecursosComponent } from './asignar-recursos.component';

describe('AsignarRecursosComponent', () => {
  let component: AsignarRecursosComponent;
  let fixture: ComponentFixture<AsignarRecursosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignarRecursosComponent]
    });
    fixture = TestBed.createComponent(AsignarRecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
