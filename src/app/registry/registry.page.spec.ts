import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistryPage } from './registry.page';

describe('RegistryPage', () => {
  let component: RegistryPage;
  let fixture: ComponentFixture<RegistryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
