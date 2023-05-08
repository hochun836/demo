import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Func0010Component } from './func0010.component';

describe('Func0010Component', () => {
  let component: Func0010Component;
  let fixture: ComponentFixture<Func0010Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Func0010Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Func0010Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
