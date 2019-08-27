import { TestBed } from '@angular/core/testing';
import { SessionStorageService } from './session-storage.service';

describe('SessionStorageService', () => {
  let sessionStorageService: SessionStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionStorageService],
    });

    sessionStorageService = TestBed.get(SessionStorageService);
  });

  it('should create', () => {
    expect(sessionStorageService).toBeTruthy();
  });

  it('should handle when item is not stored', () => {
    expect(sessionStorageService.getItem('test')).toBeNull();
  });

  it('should handle storing of undefined, and return null on get', () => {
    sessionStorageService.setItem('test', undefined);
    expect(sessionStorageService.getItem('test')).toBeNull();
  });

  it('should clear by key', () => {
    sessionStorageService.setItem('test', 'a');
    expect(sessionStorageService.getItem('test')).toEqual('a');
    sessionStorageService.removeItem('test');
    expect(sessionStorageService.getItem('test')).toBeNull();
  });

  it('should clear storage', () => {
    sessionStorageService.setItem('test1', 'a');
    sessionStorageService.setItem('test2', 'b');
    sessionStorageService.setItem('test3', 'c');
    expect(sessionStorageService.getItem('test1')).toEqual('a');
    expect(sessionStorageService.getItem('test2')).toEqual('b');
    expect(sessionStorageService.getItem('test3')).toEqual('c');
    sessionStorageService.clear();
    expect(sessionStorageService.getItem('test1')).toBeNull();
    expect(sessionStorageService.getItem('test2')).toBeNull();
    expect(sessionStorageService.getItem('test3')).toBeNull();
  });
});
