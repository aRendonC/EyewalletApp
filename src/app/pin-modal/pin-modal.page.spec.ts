import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinModalPage } from './pin-modal.page';

describe('PinModalPage', () => {
  let component: PinModalPage;
  let fixture: ComponentFixture<PinModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
