import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Func0060Component } from './func0060.component';

describe('Func0060Component', () => {
  let component: Func0060Component;
  let fixture: ComponentFixture<Func0060Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Func0060Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Func0060Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
