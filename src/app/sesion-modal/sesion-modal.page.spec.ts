import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionModalPage } from './sesion-modal.page';

describe('SesionModalPage', () => {
  let component: SesionModalPage;
  let fixture: ComponentFixture<SesionModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SesionModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
