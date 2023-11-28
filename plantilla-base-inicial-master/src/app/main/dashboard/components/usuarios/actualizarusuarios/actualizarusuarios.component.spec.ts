import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarusuariosComponent } from './actualizarusuarios.component';

describe('ActualizarusuariosComponent', () => {
  let component: ActualizarusuariosComponent;
  let fixture: ComponentFixture<ActualizarusuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarusuariosComponent]
    });
    fixture = TestBed.createComponent(ActualizarusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
