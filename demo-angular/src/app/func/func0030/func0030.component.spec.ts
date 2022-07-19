import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Func0030Component } from './func0030.component';

describe('Func0030Component', () => {
  let component: Func0030Component;
  let fixture: ComponentFixture<Func0030Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Func0030Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Func0030Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
