import { LocaleES } from '../../resources/localization/es-ES.lang';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared/shared.module';
import { LoadingIndicatorComponent } from '../loading-indicator/loading-indicator.component';
import { TestingMockEvents } from '../../.../../shared/testing/@mock/utils/testing-mock-events.class';
import {
  MultiLanguageServiceMock, //
} from '../../.../../services/api/multi-language/multi-language.service.mock';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { MultiLanguageComponent } from './multi-language.component';
import {
  MultiLanguageService,
  GetTranslationsRq, //
} from '../../.../../services/api/multi-language/multi-language.service';
import { MessagesService } from '../../.../../services/core/messages.service';
import { ButtonModule } from '../button/button.module';

describe('MultiLanguageComponent', () => {
  const mockService = new MultiLanguageServiceMock();
  const request = new GetTranslationsRq('a', 'b', 'c', 'd');
  let component: MultiLanguageComponent;
  let elementRef: HTMLElement;
  let fixture: ComponentFixture<MultiLanguageComponent>;
  let messageService: MessagesService;
  let service: MultiLanguageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultiLanguageComponent, LoadingIndicatorComponent],
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        ButtonModule,
        FormsModule,
        HttpClientTestingModule,
      ],
      providers: [
        MessagesService,
        {
          provide: MultiLanguageService,
          useClass: MultiLanguageServiceMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiLanguageComponent);
    component = fixture.componentInstance;
    service = TestBed.get(MultiLanguageService);
    messageService = TestBed.get(MessagesService);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when HTTP Request fails', () => {
    beforeEach(() => {
      component.pKey = null;
      component.table = null;
      component.schema = null;
      component.field = null;
      fixture.detectChanges();
      elementRef = fixture.debugElement.nativeElement;
    });

    it('should not get translations', () => {
      spyOn(service, 'getTranslations')
        .withArgs(request)
        .and.callThrough();
      spyOn(messageService, 'showErrorAlert').and.callThrough();
      component.initTranslations();
      expect(service.getTranslations).not.toHaveBeenCalled();
      expect(messageService.showErrorAlert).toHaveBeenCalled();
    });
  });

  describe('when HTTP Request is correct', () => {
    beforeEach(() => {
      component.pKey = request.pKey;
      component.table = request.tabla;
      component.schema = request.esquema;
      component.field = request.campo;
      fixture.detectChanges();
      elementRef = fixture.debugElement.nativeElement;
    });

    it('should get translations', () => {
      spyOn(service, 'getTranslations')
        .withArgs(request)
        .and.callThrough();
      component.initTranslations();
      expect(service.getTranslations).toHaveBeenCalled();
    });

    xdescribe('and sorting by language code', () => {
      beforeEach(() => {
        component.orderByLangCod = false;
        fixture.detectChanges();
        elementRef = fixture.debugElement.nativeElement;
      });

      it('should sort the translations', () => {
        spyOn(service, 'getTranslations')
          .withArgs(request)
          .and.callThrough();
        spyOn(component, 'sortTranslations').and.callThrough();
        component.initTranslations();
        expect(service.getTranslations).toHaveBeenCalled();
        expect(component.sortTranslations).toHaveBeenCalled();
      });
    });

    describe('and the translations dialog is opened', () => {
      beforeEach(() => {
        component.translations = null;
        component.showTranslations = false;
        fixture.detectChanges();
        spyOn(service, 'getTranslations')
          .withArgs(request)
          .and.callThrough();
        component.initTranslations();
        expect(service.getTranslations).toHaveBeenCalled();
      });

      it('should show the spinner if translations is NULL', () => {
        component.translations = null;
        component.showTranslations = true;
        fixture.detectChanges();
        elementRef = fixture.debugElement.nativeElement;
        const $spinner: HTMLElement = elementRef.querySelector('.ui-progress-spinner');

        expect($spinner).toBeDefined();
        expect($spinner).not.toBeNull();
        expect($spinner.style.display).not.toEqual('none');
      });

      it('should show an empty dialog', () => {
        component.translations = [];
        component.showTranslations = true;
        fixture.detectChanges();
        elementRef = fixture.debugElement.nativeElement;
        const $spinner: HTMLElement = elementRef.querySelector('.ui-progress-spinner');
        const $grid: HTMLElement = elementRef.querySelector('.translations-wrapper');
        const $rows: HTMLElement[] = Array.from(
          elementRef.querySelectorAll('.translations-wrapper > .p-grid')
        );
        expect($spinner).toBeNull();
        expect($grid).not.toBeNull();
        expect($rows).not.toBeNull();
        expect($rows.length).toBe(component.translations.length);
      });

      it('should show the dialog and one row per flag', () => {
        component.translations = mockService.translations;
        component.showTranslations = true;
        fixture.detectChanges();
        elementRef = fixture.debugElement.nativeElement;
        const $spinner: HTMLElement = elementRef.querySelector('.ui-progress-spinner');
        const $grid: HTMLElement = elementRef.querySelector('.translations-wrapper');
        const $rows: HTMLElement[] = Array.from(
          elementRef.querySelectorAll('.translations-wrapper > .p-grid')
        );
        const $buttons: HTMLButtonElement[] = Array.from(
          elementRef.querySelectorAll('p-dialog p-footer gp-button:not([hidden]')
        );
        // Spinner
        expect($spinner).toBeNull();
        // Grid
        expect($grid).not.toBeNull();
        expect($rows).not.toBeNull();
        expect($rows.length).toBe(component.translations.length);
        // Buttons
        expect($buttons.length).toBe(2);
        expect($buttons[0].innerText).toEqual(LocaleES.CANCEL);
        expect($buttons[1].innerText).toEqual(LocaleES.ACCEPT);
      });

      it('should show the correct flag per language', () => {
        component.translations = mockService.translations;
        component.showTranslations = true;
        fixture.detectChanges();
        elementRef = fixture.debugElement.nativeElement;
        const $grid: HTMLElement = elementRef.querySelector('.translations-wrapper');
        const $rows: HTMLElement[] = Array.from(
          elementRef.querySelectorAll('.translations-wrapper > .p-grid')
        );

        let $flag: HTMLDivElement;
        let $button: HTMLButtonElement;
        component.translations.map((item: any, index: number) => {
          if (item.idiomaPais) {
            $flag = elementRef.querySelector(`.flag.flag-${item.idiomaPais.toLowerCase()}`);
            expect($flag).not.toBeNull();
          } else {
            $flag = elementRef.querySelector('.flag.no-flag');
            expect($flag).not.toBeNull();
          }

          $button = $rows[index].querySelector('.p-grid gp-button');
          expect($button).toBeNull();
        });

        expect($grid).not.toBeNull();
        expect($rows).not.toBeNull();
        expect($rows.length).toBe(component.translations.length);
        // Editor HTML should be hidden.
        const $editorDialog = elementRef.querySelector('p-editor');
        expect($editorDialog).toBeNull();
      });

      it('should show HTML Editor Button', () => {
        spyOn(component, 'showEditorHTMLDialog').and.callThrough();
        component.translations = mockService.translations;
        component.showTranslations = true;
        component.isEditing = true;
        fixture.detectChanges();
        elementRef = fixture.debugElement.nativeElement;
        const $rows: HTMLElement[] = Array.from(
          elementRef.querySelectorAll('.ui-grid-col-12 > .ui-grid-row')
        );

        let $button: HTMLDivElement;
        $rows.map(($r) => {
          $button = $r.querySelector('.ui-grid-row gp-button');
          expect($button).not.toBeNull();
        });
      });

      it('should save when the user clicks on save button', () => {
        spyOn(component, 'save').and.callThrough();
        spyOn(component, 'hideTranslations').and.callThrough();
        component.translations = mockService.translations;
        component.showTranslations = true;
        component.isEditing = true;
        fixture.detectChanges();
        elementRef = fixture.debugElement.nativeElement;
        const $saveButton: HTMLButtonElement = elementRef.querySelector(
          'p-dialog gp-button[icon="pi pi-check"]'
        );
        $saveButton.click();
        expect(component.save).toHaveBeenCalled();
        expect(component.hideTranslations).toHaveBeenCalled();
      });

      it('should show an error when the saving fails', () => {
        spyOn(component, 'save').and.callThrough();
        spyOn(component, 'hideTranslations').and.callThrough();
        component.pKey = 'ERROR';
        component.translations = mockService.translations;
        component.showTranslations = true;
        component.isEditing = true;
        fixture.detectChanges();
        elementRef = fixture.debugElement.nativeElement;
        const $saveButton: HTMLButtonElement = elementRef.querySelector(
          'p-dialog gp-button[icon="pi pi-check"]'
        );
        $saveButton.click();
        expect(component.save).toHaveBeenCalled();
        expect(component.hideTranslations).toHaveBeenCalled();
      });
      it('should show an error when the saving fails', () => {
        spyOn(component, 'save').and.callThrough();
        spyOn(component, 'hideTranslations').and.callThrough();
        component.pKey = 'ERROR500';
        component.translations = mockService.translations;
        component.showTranslations = true;
        component.isEditing = true;
        fixture.detectChanges();
        elementRef = fixture.debugElement.nativeElement;
        const $saveButton: HTMLButtonElement = elementRef.querySelector(
          'p-dialog gp-button[icon="pi pi-check"]'
        );
        $saveButton.click();
        expect(component.save).toHaveBeenCalled();
        expect(component.hideTranslations).toHaveBeenCalled();
      });
    });

    describe('and the HTML Editor Dialog is opened', () => {
      let data;
      beforeEach(() => {
        spyOn(service, 'getTranslations')
          .withArgs(request)
          .and.callThrough();
        spyOn(component, 'showEditorHTMLDialog').and.callThrough();

        component.translations = mockService.translations;
        component.showTranslations = true;
        component.isEditing = true;
        component.showHTMLEditor = false;
        fixture.detectChanges();
        // Open first dialog about translations.
        component.initTranslations();
        expect(service.getTranslations).toHaveBeenCalled();
        fixture.detectChanges();

        elementRef = fixture.debugElement.nativeElement;
        // Get the first element's data.
        data = component.translations[0];

        // Get first row and its HTML Editor button.
        const $row: HTMLElement = elementRef.querySelector('.translations-wrapper > .p-grid');
        const $button: HTMLButtonElement = $row.querySelector('.p-grid gp-button');
        expect($button).not.toBeNull();

        // Click on first HTML Editor button
        TestingMockEvents.triggerClickOn($button);
        fixture.detectChanges();
        expect(component.showEditorHTMLDialog).toHaveBeenCalledWith(data);
        elementRef = fixture.debugElement.nativeElement;
      });

      it('should be active', () => {
        const $editorDialog = elementRef.querySelectorAll('p-dialog')[1];
        const $header: HTMLSpanElement = $editorDialog.querySelector('span.ui-dialog-title');
        const translation = data.idiomaPaisTraduccion ? data.idiomaPaisTraduccion : data.idiomaPais;

        expect(component.showTranslations).toBe(false);
        expect(component.showHTMLEditor).toBe(true);
        expect($editorDialog).not.toBeNull();
        expect($header).not.toBeNull();
        expect($header.innerText).toEqual('Traducción - ' + translation);
      });

      it('should have a toolbar and footer', () => {
        const $editorDialog = elementRef.querySelector('p-editor');
        expect($editorDialog).not.toBeNull();

        // Toolbar Buttons
        const $toolbarButtons: HTMLButtonElement[] = Array.from(
          elementRef.querySelectorAll('p-dialog p-header button:not([hidden]')
        );
        expect($toolbarButtons.length).toBe(3);

        // Footer Buttons
        const $footerButtons: HTMLButtonElement[] = Array.from(
          elementRef.querySelectorAll('p-dialog p-footer gp-button:not([hidden])')
        );
        expect($footerButtons.length).toBe(2);
        expect($footerButtons[0].innerText).toEqual(LocaleES.LEAVE);
        expect($footerButtons[1].innerText).toEqual(LocaleES.SAVE);
      });

      it('should save', () => {
        spyOn(component, 'saveHTML').and.callThrough();

        component.currentLanguageHTML = component.translations[0].idiomaPais;
        component.currentTextHTML =
          '<div>Hello World!</div><div>PrimeNG <b>Editor</b> Rocks</div><div><br></div>';

        const $saveButton: Element = elementRef.querySelector(
          'p-dialog p-footer gp-button[icon="pi pi-check"]'
        );
        TestingMockEvents.triggerClickOn($saveButton);
        fixture.detectChanges();
        component.translations[0].idiomaPais = component.currentLanguageHTML;
        component.translations[0].idiomaPaisTraduccion = component.currentTextHTML;
        expect(component.saveHTML).toHaveBeenCalled();
      });
    });
  });
});
