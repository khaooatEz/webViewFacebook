import { TestBed } from '@angular/core/testing';

import { PsidService } from './psid.service';

describe('PsidService', () => {
  let service: PsidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PsidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
