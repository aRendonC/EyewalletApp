import { TestBed } from '@angular/core/testing';

import { AesJsService } from './aes-js.service';

describe('AesJsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AesJsService = TestBed.get(AesJsService);
    expect(service).toBeTruthy();
  });
});
