import {TestBed} from '@angular/core/testing';

import {UserTableDataSourceService} from './user-table-data-source.service';

describe('UserTableDataSourceService', () => {
  let service: UserTableDataSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTableDataSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
