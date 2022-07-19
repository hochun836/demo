import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Func0080Component } from './func0080.component';

describe('Func0080Component', () => {
  let component: Func0080Component;
  let fixture: ComponentFixture<Func0080Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Func0080Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Func0080Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
