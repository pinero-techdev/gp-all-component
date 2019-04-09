import {
    MainMenuProviderServiceMock,
    MAIN_MENU_TEMP_MOCK,
    MAIN_MENU_ROLES_MOCK,
} from './main-menu.mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GlobalService } from './../../core/global.service';
import { TestBed, async } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { MainMenuService, MenuRq } from './main-menu.service';
import { GpAllComponentModule } from '@lib/gp-all-component.module';

describe('MainMenuService', () => {
    let httpClient: HttpClient;
    let providerSpy: any;
    let service: MainMenuService;
    const sessionId = 'ABCDEFG12345';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [GpAllComponentModule, HttpClientTestingModule],
            providers: [GlobalService, MainMenuService],
        }).compileComponents();
    }));

    beforeEach(() => {
        httpClient = TestBed.get(HttpClient);
        providerSpy = jasmine.createSpyObj('MainMenuProviderService', [
            'obtenOpcionesActivas',
            'getEstructuraMenu',
        ]);
        service = new MainMenuService(providerSpy);
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should get menu elements', () => {
        const menuRequest = new MenuRq(sessionId);
        const mock = new MainMenuProviderServiceMock(httpClient);
        providerSpy.getEstructuraMenu.and.returnValue(mock.getEstructuraMenu());
        providerSpy.obtenOpcionesActivas.and.returnValue(mock.obtenOpcionesActivas());
        spyOn(service, 'cargarOpciones').and.callThrough();
        spyOn(GlobalService, 'setRoles').and.callThrough();

        service.obtenMenu(menuRequest).subscribe((data) => {
            expect(data).toEqual(MAIN_MENU_TEMP_MOCK);
            expect(GlobalService.setRoles).toHaveBeenCalled();
            expect(GlobalService.getROLES()).toEqual(MAIN_MENU_ROLES_MOCK);
        });
        expect(service.cargarOpciones).toHaveBeenCalled();
    });
});
