import { TestBed } from '@angular/core/testing';

import { TouchLoginService } from './touch-login.service';

describe('TouchLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TouchLoginService = TestBed.get(TouchLoginService);
    expect(service).toBeTruthy();
  });
});
