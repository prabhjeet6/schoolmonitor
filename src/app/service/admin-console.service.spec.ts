import { TestBed } from '@angular/core/testing';

import { AdminConsoleService } from './admin-console.service';

describe('AdminConsoleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminConsoleService = TestBed.get(AdminConsoleService);
    expect(service).toBeTruthy();
  });
});
