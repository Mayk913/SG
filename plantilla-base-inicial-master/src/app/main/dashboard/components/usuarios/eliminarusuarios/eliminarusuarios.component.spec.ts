import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarusuariosComponent } from './eliminarusuarios.component';

describe('EliminarusuariosComponent', () => {
  let component: EliminarusuariosComponent;
  let fixture: ComponentFixture<EliminarusuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarusuariosComponent]
    });
    fixture = TestBed.createComponent(EliminarusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
