import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarRecursosComponent } from './mostrar-recursos.component';

describe('MostrarRecursosComponent', () => {
  let component: MostrarRecursosComponent;
  let fixture: ComponentFixture<MostrarRecursosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostrarRecursosComponent]
    });
    fixture = TestBed.createComponent(MostrarRecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
