import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaultPage } from './vault.page';

describe('VaultPage', () => {
  let component: VaultPage;
  let fixture: ComponentFixture<VaultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaultPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
