import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Func0020Component } from './func0020.component';

describe('Func0020Component', () => {
  let component: Func0020Component;
  let fixture: ComponentFixture<Func0020Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Func0020Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Func0020Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
