import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestorePage } from './restore.page';

describe('RestorePage', () => {
  let component: RestorePage;
  let fixture: ComponentFixture<RestorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestorePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
