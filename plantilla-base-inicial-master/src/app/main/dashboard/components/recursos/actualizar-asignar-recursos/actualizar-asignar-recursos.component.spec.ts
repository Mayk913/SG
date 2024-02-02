import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarAsignarRecursosComponent } from './actualizar-asignar-recursos.component';

describe('ActualizarAsignarRecursosComponent', () => {
  let component: ActualizarAsignarRecursosComponent;
  let fixture: ComponentFixture<ActualizarAsignarRecursosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarAsignarRecursosComponent]
    });
    fixture = TestBed.createComponent(ActualizarAsignarRecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
