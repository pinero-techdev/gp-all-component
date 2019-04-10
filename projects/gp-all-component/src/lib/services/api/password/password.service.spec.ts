import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GlobalService } from '../../core/global.service';
import { TestBed, async } from '@angular/core/testing';
import { PasswordService, ModificaPasswordRq } from './password.service';

describe('PasswordServiceSpec', () => {
    let service: PasswordService;
    const applicationApiUrl = '/test-app';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [GlobalService, PasswordService],
        }).compileComponents();
    }));

    beforeEach(() => {
        GlobalService.setBaseUrl(applicationApiUrl);
        service = TestBed.get(PasswordService);
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should update password', () => {
        const url = `${applicationApiUrl}/password-svc/modifica`;
        const request = new ModificaPasswordRq('a', 'b', 'c');
        spyOn(service, 'post').and.callThrough();
        spyOn(GlobalService, 'getBASE_URL').and.callThrough();
        service.modifica(request).subscribe();
        expect(service.post).toHaveBeenCalledWith(url, JSON.stringify(request));
        expect(GlobalService.getBASE_URL).toHaveBeenCalled();
    });
});
