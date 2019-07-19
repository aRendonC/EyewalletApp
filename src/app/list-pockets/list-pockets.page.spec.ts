import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPocketsPage } from './list-pockets.page';

describe('ListPocketsPage', () => {
  let component: ListPocketsPage;
  let fixture: ComponentFixture<ListPocketsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPocketsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPocketsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
