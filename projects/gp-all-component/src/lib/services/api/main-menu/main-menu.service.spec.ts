import { CommonRs } from './../../core/common.service';
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
import { of } from 'rxjs';

describe('MainMenuService', () => {
  let httpClient: HttpClient;
  let providerSpy: any;
  let service: MainMenuService;
  const sessionId = 'ABCDEFG12345';
  const menuRequest = new MenuRq(sessionId);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GlobalService, MainMenuService],
    });
  }));

  beforeEach(() => {
    httpClient = TestBed.get(HttpClient);
    providerSpy = jasmine.createSpyObj('MainMenuProviderService', [
      'getOptions',
      'getMenuStructure',
    ]);
    service = new MainMenuService(providerSpy);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('When menu has elements', () => {
    const mock = new MainMenuProviderServiceMock(httpClient);

    it('should get menu elements', () => {
      providerSpy.getMenuStructure.and.returnValue(mock.getMenuStructure());
      providerSpy.getOptions.and.returnValue(mock.getOptions());
      spyOn(service, 'getOptions').and.callThrough();
      spyOn(GlobalService, 'setRoles').and.callThrough();

      service.getMenu(menuRequest).subscribe((data) => {
        expect(data).toEqual(MAIN_MENU_TEMP_MOCK);
        expect(GlobalService.setRoles).toHaveBeenCalled();
        expect(GlobalService.getROLES()).toEqual(MAIN_MENU_ROLES_MOCK);
      });
      expect(service.getOptions).toHaveBeenCalled();
    });
  });

  describe('When menu is empty', () => {
    const emptyResponse: any = new CommonRs();

    beforeEach(() => {
      emptyResponse.ok = true;
      emptyResponse.menu = { opciones: [] };
      emptyResponse.roles = [];
    });

    it('should get zero elements', () => {
      providerSpy.getMenuStructure.and.returnValue([]);
      providerSpy.getOptions.and.returnValue(of(emptyResponse));
      spyOn(service, 'getOptions').and.callThrough();
      spyOn(GlobalService, 'setRoles').and.callThrough();

      service.getMenu(menuRequest).subscribe((data) => {
        expect(data).toEqual([]);
        expect(GlobalService.setRoles).not.toHaveBeenCalled();
      });

      expect(service.getOptions).not.toHaveBeenCalled();
    });

    it('should set roles although the menu is empty', () => {
      emptyResponse.roles = MAIN_MENU_ROLES_MOCK;

      providerSpy.getMenuStructure.and.returnValue([]);
      providerSpy.getOptions.and.returnValue(of(emptyResponse));

      spyOn(service, 'getOptions').and.callThrough();
      spyOn(GlobalService, 'setRoles').and.callThrough();

      service.getMenu(menuRequest).subscribe((data) => {
        expect(data.length).toBe(0);
        expect(GlobalService.setRoles).toHaveBeenCalled();
      });

      expect(service.getOptions).not.toHaveBeenCalled();
    });
  });

  describe('When provider returns an error', () => {
    const emptyResponse: any = new CommonRs();

    beforeEach(() => {
      emptyResponse.ok = false;
      emptyResponse.menu = null;
      emptyResponse.roles = null;
    });

    it('should returns an empty menu', () => {
      providerSpy.getMenuStructure.and.returnValue([]);
      providerSpy.getOptions.and.returnValue(of(emptyResponse));

      spyOn(service, 'getOptions').and.callThrough();
      spyOn(GlobalService, 'setRoles').and.callThrough();

      service.getMenu(menuRequest).subscribe((data) => {
        expect(data.length).toBe(0);
        expect(GlobalService.setRoles).not.toHaveBeenCalled();
      });

      expect(service.getOptions).not.toHaveBeenCalled();
    });
  });
});
