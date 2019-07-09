import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinPage } from './pin.page';

describe('PinPage', () => {
  let component: PinPage;
  let fixture: ComponentFixture<PinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
