import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinComponent } from './pin.component';

describe('PinComponent', () => {
  let component: PinComponent;
  let fixture: ComponentFixture<PinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
