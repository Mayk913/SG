import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarRecursosComponent } from './actualizar-recursos.component';

describe('ActualizarRecursosComponent', () => {
  let component: ActualizarRecursosComponent;
  let fixture: ComponentFixture<ActualizarRecursosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarRecursosComponent]
    });
    fixture = TestBed.createComponent(ActualizarRecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
