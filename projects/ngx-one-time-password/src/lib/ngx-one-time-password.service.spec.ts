import { TestBed } from '@angular/core/testing';

import { NgxOneTimePasswordService } from './ngx-one-time-password.service';

describe('NgxOneTimePasswordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxOneTimePasswordService = TestBed.get(NgxOneTimePasswordService);
    expect(service).toBeTruthy();
  });
});
