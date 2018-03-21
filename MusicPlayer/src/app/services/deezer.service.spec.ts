import { TestBed, inject } from '@angular/core/testing';

import { DeezerService } from './deezer.service';

describe('DeezerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeezerService]
    });
  });

  it('should be created', inject([DeezerService], (service: DeezerService) => {
    expect(service).toBeTruthy();
  }));
});
