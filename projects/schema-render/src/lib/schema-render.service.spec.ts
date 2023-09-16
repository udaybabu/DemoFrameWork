import { TestBed } from '@angular/core/testing';

import { SchemaRenderService } from './schema-render.service';

describe('SchemaRenderService', () => {
  let service: SchemaRenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchemaRenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
