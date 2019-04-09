import { MainMenuProviderService } from './main-menu-provider.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GlobalService } from '../../core/global.service';
import { TestBed, async } from '@angular/core/testing';
import { GpAllComponentModule } from '@lib/gp-all-component.module';

fdescribe('MainMenuProviderService', () => {
    let service: MainMenuProviderService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [GpAllComponentModule, HttpClientTestingModule],
            providers: [GlobalService, MainMenuProviderService],
        }).compileComponents();
    }));

    beforeEach(() => {
        service = TestBed.get(MainMenuProviderService);
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    describe('When menu is empty', () => {
        it('should have menu elements', () => {
            expect(service).toBeTruthy();
        });
    });

    describe('When menu has elements', () => {
        it('should have menu elements', () => {
            expect(service).toBeTruthy();
        });
    });
});
