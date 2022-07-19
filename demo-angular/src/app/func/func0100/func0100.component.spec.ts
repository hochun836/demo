import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Func0100Component } from './func0100.component';

describe('Func0100Component', () => {
  let component: Func0100Component;
  let fixture: ComponentFixture<Func0100Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Func0100Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Func0100Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
