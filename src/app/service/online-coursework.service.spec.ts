import { TestBed } from '@angular/core/testing';

import { OnlineCourseworkService } from './online-coursework.service';

describe('OnlineCourseworkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnlineCourseworkService = TestBed.get(OnlineCourseworkService);
    expect(service).toBeTruthy();
  });
});
