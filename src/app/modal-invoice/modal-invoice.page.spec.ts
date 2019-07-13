import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInvoicePage } from './modal-invoice.page';

describe('ModalInvoicePage', () => {
  let component: ModalInvoicePage;
  let fixture: ComponentFixture<ModalInvoicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalInvoicePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInvoicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
