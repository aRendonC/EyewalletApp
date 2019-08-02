import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaultListPage } from './vault-list.page';

describe('VaultListPage', () => {
  let component: VaultListPage;
  let fixture: ComponentFixture<VaultListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaultListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaultListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
