import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryExchangePage } from './history-exchange.page';

describe('HistoryExchangePage', () => {
  let component: HistoryExchangePage;
  let fixture: ComponentFixture<HistoryExchangePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryExchangePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryExchangePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
