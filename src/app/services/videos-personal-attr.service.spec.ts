import { TestBed } from '@angular/core/testing';

import { VideosPersonalAttrService } from './videos-personal-attr.service';

describe('FirestoreServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VideosPersonalAttrService = TestBed.get(VideosPersonalAttrService);
    expect(service).toBeTruthy();
  });
});
