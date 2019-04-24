import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GlobalService } from '../../core/global.service';
import { TestBed, async } from '@angular/core/testing';
import { ForgotPasswordService, ForgotPasswordRq } from './forgot-password.service';

describe('ForgotPasswordServiceSpec', () => {
  let service: ForgotPasswordService;
  const applicationApiUrl = '/test-app';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GlobalService, ForgotPasswordService],
    }).compileComponents();
  }));

  beforeEach(() => {
    GlobalService.setBaseUrl(applicationApiUrl);
    service = TestBed.get(ForgotPasswordService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should update password', () => {
    const url = `${applicationApiUrl}/password-svc/modifica`;
    const request = new ForgotPasswordRq('a', 'b', 'c');
    spyOn(service, 'post').and.callThrough();
    spyOn(GlobalService, 'getBASE_URL').and.callThrough();
    service.updatePassword(request).subscribe();
    expect(service.post).toHaveBeenCalledWith(url, JSON.stringify(request));
    expect(GlobalService.getBASE_URL).toHaveBeenCalled();
  });
});
