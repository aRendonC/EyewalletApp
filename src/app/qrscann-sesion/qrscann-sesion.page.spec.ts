import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrscannSesionPage } from './qrscann-sesion.page';

describe('QrscannSesionPage', () => {
  let component: QrscannSesionPage;
  let fixture: ComponentFixture<QrscannSesionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrscannSesionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrscannSesionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
