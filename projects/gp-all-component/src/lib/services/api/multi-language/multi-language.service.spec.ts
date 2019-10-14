import { UpdateTranslationsRq } from './multi-language.service';
import {
  MultiLanguageService,
  GetTranslationsRq, //
} from './../../../services/api/multi-language/multi-language.service';
import { TestBed, async } from '@angular/core/testing';
import { GlobalService } from '../../core/global.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MultiLanguageServiceSpec', () => {
  let service: MultiLanguageService;
  const applicationApiUrl = '/test-app';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GlobalService, MultiLanguageService],
    });
  }));

  beforeEach(() => {
    GlobalService.setBaseUrl(applicationApiUrl);
    service = TestBed.get(MultiLanguageService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should get translations', () => {
    const url = `${applicationApiUrl}/multiidioma-svc/getTranslations`;
    const request = new GetTranslationsRq('a', 'b', 'c', 'd');
    spyOn(service, 'post').and.callThrough();
    service.getTranslations(request).subscribe();
    expect(service.post).toHaveBeenCalledWith(url, JSON.stringify(request));
  });

  it('should update translations', () => {
    const url = `${applicationApiUrl}/multiidioma-svc/updateTranslations`;
    const request = new UpdateTranslationsRq('a', 'b', 'c', 'd', 'e', 'f');
    spyOn(service, 'post').and.callThrough();
    service.updateTranslations(request).subscribe();
    expect(service.post).toHaveBeenCalledWith(url, JSON.stringify(request));
  });
});
