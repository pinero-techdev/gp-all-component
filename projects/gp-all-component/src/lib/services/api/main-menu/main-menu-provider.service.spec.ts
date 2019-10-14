import { MAIN_MENU_TEMP_MOCK } from './main-menu.mock';
import { MainMenuProviderService } from './main-menu-provider.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GlobalService } from '../../core/global.service';
import { TestBed, async } from '@angular/core/testing';

describe('MainMenuProviderService', () => {
  let service: MainMenuProviderService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GlobalService, MainMenuProviderService],
    });
  }));

  beforeEach(() => {
    service = TestBed.get(MainMenuProviderService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('Method: hasActiveOptions', () => {
    it('should return false', () => {
      let response = service.hasActiveOptions([], []);
      expect(response).toBeFalsy();
      response = service.hasActiveOptions([], ['1', '2']);
      expect(response).toBeFalsy();
      response = service.hasActiveOptions([{}], ['1', '2']);
      expect(response).toBeFalsy();
      response = service.hasActiveOptions(['a'], undefined);
      expect(response).toBeFalsy();
      response = service.hasActiveOptions(['undefined'], undefined);
      expect(response).toBeFalsy();
      response = service.hasActiveOptions([undefined], undefined);
      expect(response).toBeFalsy();
      response = service.hasActiveOptions([null], undefined);
      expect(response).toBeFalsy();
    });

    it('should return true', () => {
      let response = service.hasActiveOptions(MAIN_MENU_TEMP_MOCK, ['CLDFR029A', 'CLDFR029B']);
      expect(response).toBeTruthy();
      response = service.hasActiveOptions(MAIN_MENU_TEMP_MOCK, ['CRMFR050ATest', 'CRMFR050A']);
      expect(response).toBeTruthy();
    });
  });

  xdescribe('Method: optionIsActive', () => {
    it('should returns false', () => {
      let response = service.optionIsActive([], '', -1);
      expect(response).toBeFalsy();
      response = service.optionIsActive([], '', 0);
      expect(response).toBeFalsy();
      response = service.optionIsActive([], '', null);
      expect(response).toBeFalsy();
      response = service.optionIsActive([], null, null);
      expect(response).toBeFalsy();
      response = service.optionIsActive(null, null, null);
      expect(response).toBeFalsy();
      response = service.optionIsActive(undefined, undefined, undefined);
      expect(response).toBeFalsy();
      response = service.optionIsActive([undefined], undefined, undefined);
      expect(response).toBeFalsy();
      response = service.optionIsActive(MAIN_MENU_TEMP_MOCK, 'undefined', undefined);
      expect(response).toBeFalsy();
      response = service.optionIsActive(MAIN_MENU_TEMP_MOCK, 'reservas', 0);
      expect(response).toBeFalsy();
      response = service.optionIsActive(
        MAIN_MENU_TEMP_MOCK,
        'concierge-service/movimientos-concierge',
        null
      );
      expect(response).toBeFalsy();
      response = service.optionIsActive(MAIN_MENU_TEMP_MOCK, 'movimientos-concierge360', null);
      expect(response).toBeFalsy();
    });

    it('should returns true', () => {
      let response = service.optionIsActive(MAIN_MENU_TEMP_MOCK, 'reservas360', 1);
      expect(response).toBeTruthy();
      response = service.optionIsActive(MAIN_MENU_TEMP_MOCK, 'reservas360', -1);
      expect(response).toBeTruthy();
      response = service.optionIsActive(MAIN_MENU_TEMP_MOCK, 'reservas360', 4);
      expect(response).toBeTruthy();
      response = service.optionIsActive(MAIN_MENU_TEMP_MOCK, 'movimientos-concierge', 1);
      expect(response).toBeTruthy();
    });
  });
});
