import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Func0070Component } from './func0070.component';

describe('Func0070Component', () => {
  let component: Func0070Component;
  let fixture: ComponentFixture<Func0070Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Func0070Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Func0070Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
