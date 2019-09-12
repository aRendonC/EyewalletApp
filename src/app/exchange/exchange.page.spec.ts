import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangePage } from './exchange.page';

describe('ExchangePage', () => {
  let component: ExchangePage;
  let fixture: ComponentFixture<ExchangePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
