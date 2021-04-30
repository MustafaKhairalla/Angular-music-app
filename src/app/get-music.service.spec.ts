import { TestBed } from '@angular/core/testing';

import { GetMusicService } from './get-music.service';

describe('GetMusicService', () => {
  let service: GetMusicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetMusicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
