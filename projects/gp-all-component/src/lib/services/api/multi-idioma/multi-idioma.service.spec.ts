import { TestBed, async } from '@angular/core/testing';
import { GlobalService } from '../../core/global.service';
import { MultiIdomaService, GetTraduccionesRq, UpdateTraduccionesRq } from './multi-idioma.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MultiIdiomaServiceSpec', () => {
    let service: MultiIdomaService;
    const applicationApiUrl = '/test-app';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [GlobalService, MultiIdomaService],
        }).compileComponents();
    }));

    beforeEach(() => {
        GlobalService.setBaseUrl(applicationApiUrl);
        service = TestBed.get(MultiIdomaService);
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should get translations', () => {
        const url = `${applicationApiUrl}/multiidioma-svc/getTranslations`;
        const request = new GetTraduccionesRq('a', 'b', 'c', 'd');
        spyOn(service, 'post').and.callThrough();
        service.getTraducciones(request).subscribe();
        expect(service.post).toHaveBeenCalledWith(url, JSON.stringify(request));
    });

    it('should update translations', () => {
        const url = `${applicationApiUrl}/multiidioma-svc/updateTranslations`;
        const request = new UpdateTraduccionesRq('a', 'b', 'c', 'd', 'e', 'f');
        spyOn(service, 'post').and.callThrough();
        service.actualizaTraducciones(request).subscribe();
        expect(service.post).toHaveBeenCalledWith(url, JSON.stringify(request));
    });
});
