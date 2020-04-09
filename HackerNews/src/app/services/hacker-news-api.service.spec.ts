import { TestBed } from '@angular/core/testing';

import { HackerNewsApiService } from './hacker-news-api.service';

describe('HackerNewsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HackerNewsApiService = TestBed.get(HackerNewsApiService);
    expect(service).toBeTruthy();
  });
});
