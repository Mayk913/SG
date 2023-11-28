import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarRecursosComponent } from './eliminar-recursos.component';

describe('EliminarRecursosComponent', () => {
  let component: EliminarRecursosComponent;
  let fixture: ComponentFixture<EliminarRecursosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarRecursosComponent]
    });
    fixture = TestBed.createComponent(EliminarRecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
