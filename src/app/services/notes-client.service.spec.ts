import { TestBed } from '@angular/core/testing';

import { NotesClientService } from './notes-client.service';

describe('NotesClientService', () => {
  let service: NotesClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotesClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
