import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Func0050Component } from './func0050.component';

describe('Func0050Component', () => {
  let component: Func0050Component;
  let fixture: ComponentFixture<Func0050Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Func0050Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Func0050Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
