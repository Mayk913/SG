import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarRolesComponent } from './eliminar-roles.component';

describe('EliminarRolesComponent', () => {
  let component: EliminarRolesComponent;
  let fixture: ComponentFixture<EliminarRolesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarRolesComponent]
    });
    fixture = TestBed.createComponent(EliminarRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
