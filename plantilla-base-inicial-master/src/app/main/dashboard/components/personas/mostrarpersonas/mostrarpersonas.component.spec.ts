import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarpersonasComponent } from './mostrarpersonas.component';

describe('MostrarpersonasComponent', () => {
  let component: MostrarpersonasComponent;
  let fixture: ComponentFixture<MostrarpersonasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostrarpersonasComponent]
    });
    fixture = TestBed.createComponent(MostrarpersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
