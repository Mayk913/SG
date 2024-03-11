import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarRolesComponent } from './mostrar-roles.component';

describe('MostrarRolesComponent', () => {
  let component: MostrarRolesComponent;
  let fixture: ComponentFixture<MostrarRolesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostrarRolesComponent]
    });
    fixture = TestBed.createComponent(MostrarRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
