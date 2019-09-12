import { TestBed } from '@angular/core/testing';

import { HammerService } from './hammer.service';

describe('HammerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HammerService = TestBed.get(HammerService);
    expect(service).toBeTruthy();
  });
});
