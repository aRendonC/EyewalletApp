import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInvoicePage } from './card-invoice.page';

describe('CardInvoicePage', () => {
  let component: CardInvoicePage;
  let fixture: ComponentFixture<CardInvoicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardInvoicePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardInvoicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
