import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Func0090Component } from './func0090.component';

describe('Func0090Component', () => {
  let component: Func0090Component;
  let fixture: ComponentFixture<Func0090Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Func0090Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Func0090Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
