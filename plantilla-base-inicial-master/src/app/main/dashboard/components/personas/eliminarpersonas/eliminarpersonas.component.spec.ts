import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarpersonasComponent } from './eliminarpersonas.component';

describe('EliminarpersonasComponent', () => {
  let component: EliminarpersonasComponent;
  let fixture: ComponentFixture<EliminarpersonasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EliminarpersonasComponent]
    });
    fixture = TestBed.createComponent(EliminarpersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
