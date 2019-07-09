import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendCryptocurrenciesPage } from './send-cryptocurrencies.page';

describe('SendCryptocurrenciesPage', () => {
  let component: SendCryptocurrenciesPage;
  let fixture: ComponentFixture<SendCryptocurrenciesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendCryptocurrenciesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendCryptocurrenciesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
