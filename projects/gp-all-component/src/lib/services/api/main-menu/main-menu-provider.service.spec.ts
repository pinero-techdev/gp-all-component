import { MAIN_MENU_TEMP_MOCK } from './main-menu.mock';
import { MainMenuProviderService } from './main-menu-provider.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GlobalService } from '../../core/global.service';
import { TestBed, async } from '@angular/core/testing';
import { GpAllComponentModule } from '@lib/gp-all-component.module';

describe('MainMenuProviderService', () => {
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

    describe('Method: tieneOpcionesMenuActivas', () => {
        it('should returns false', () => {
            let response = service.tieneOpcionesMenuActivas([], []);
            expect(response).toBeFalsy();
            response = service.tieneOpcionesMenuActivas([], ['1', '2']);
            expect(response).toBeFalsy();
            response = service.tieneOpcionesMenuActivas([{}], ['1', '2']);
            expect(response).toBeFalsy();
            response = service.tieneOpcionesMenuActivas(['a'], undefined);
            expect(response).toBeFalsy();
            response = service.tieneOpcionesMenuActivas(['undefined'], undefined);
            expect(response).toBeFalsy();
            response = service.tieneOpcionesMenuActivas([undefined], undefined);
            expect(response).toBeFalsy();
            response = service.tieneOpcionesMenuActivas([null], undefined);
            expect(response).toBeFalsy();
            response = service.tieneOpcionesMenuActivas(MAIN_MENU_TEMP_MOCK, [
                'concierge-service',
                'FROFR001',
                'CRMFR050A',
            ]);
            expect(response).toBeFalsy();
        });

        it('should returns true', () => {
            let response = service.tieneOpcionesMenuActivas(MAIN_MENU_TEMP_MOCK, [
                'CLDFR029A',
                'CLDFR029B',
            ]);
            expect(response).toBeTruthy();
            response = service.tieneOpcionesMenuActivas(MAIN_MENU_TEMP_MOCK, [
                'CRMFR050ATest',
                'CRMFR050A',
            ]);
            expect(response).toBeTruthy();
        });
    });

    describe('Method: isOpcionMenuActivo', () => {
        it('should returns false', () => {
            let response = service.isOpcionMenuActivo([], '', -1);
            expect(response).toBeFalsy();
            response = service.isOpcionMenuActivo([], '', 0);
            expect(response).toBeFalsy();
            response = service.isOpcionMenuActivo([], '', null);
            expect(response).toBeFalsy();
            response = service.isOpcionMenuActivo([], null, null);
            expect(response).toBeFalsy();
            response = service.isOpcionMenuActivo(null, null, null);
            expect(response).toBeFalsy();
            response = service.isOpcionMenuActivo(undefined, undefined, undefined);
            expect(response).toBeFalsy();
            response = service.isOpcionMenuActivo([undefined], undefined, undefined);
            expect(response).toBeFalsy();
            response = service.isOpcionMenuActivo(MAIN_MENU_TEMP_MOCK, 'undefined', undefined);
            expect(response).toBeFalsy();
            response = service.isOpcionMenuActivo(MAIN_MENU_TEMP_MOCK, 'reservas', 0);
            expect(response).toBeFalsy();
            response = service.isOpcionMenuActivo(
                MAIN_MENU_TEMP_MOCK,
                'concierge-service/movimientos-concierge',
                null
            );
            expect(response).toBeFalsy();
            response = service.isOpcionMenuActivo(
                MAIN_MENU_TEMP_MOCK,
                'movimientos-concierge360',
                null
            );
            expect(response).toBeFalsy();
        });

        it('should returns true', () => {
            let response = service.isOpcionMenuActivo(MAIN_MENU_TEMP_MOCK, 'reservas360', 1);
            expect(response).toBeTruthy();
            response = service.isOpcionMenuActivo(MAIN_MENU_TEMP_MOCK, 'reservas360', -1);
            expect(response).toBeTruthy();
            response = service.isOpcionMenuActivo(MAIN_MENU_TEMP_MOCK, 'reservas360', null);
            expect(response).toBeTruthy();
            response = service.isOpcionMenuActivo(
                MAIN_MENU_TEMP_MOCK,
                'movimientos-concierge',
                null
            );
            expect(response).toBeTruthy();
        });
    });
});
