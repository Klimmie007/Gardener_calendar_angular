import { TestBed } from '@angular/core/testing';

import { FutureWeatherService } from './future-weather.service';

describe('FutureWeatherService', () => {
  let service: FutureWeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FutureWeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
