import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Func0040Component } from './func0040.component';

describe('Func0040Component', () => {
  let component: Func0040Component;
  let fixture: ComponentFixture<Func0040Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Func0040Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Func0040Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
