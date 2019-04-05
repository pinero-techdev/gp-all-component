import { Traduccion } from './../../resources/data/traduccion.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LoadingIndicatorComponent } from './../loading-indicator/loading-indicator.component';
import { SharedModule } from './../../shared/shared.module';
import { MultiIdiomaServiceMock } from './multi-idioma.mock';
import {
    MultiIdomaService,
    GetTraduccionesRq,
} from './../../services/api/multi-idioma/multi-idioma.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MultiIdiomaComponent } from './multi-idioma.component';
import { TestingMockEvents } from '../../shared/testing/testing-mock-events.class';

describe('MultiIdiomaComponent', () => {
    let component: MultiIdiomaComponent;
    let fixture: ComponentFixture<MultiIdiomaComponent>;
    let service: MultiIdomaService;
    let elementRef: HTMLElement;
    const mockService = new MultiIdiomaServiceMock();
    const testingMockEvents = new TestingMockEvents();
    const request = new GetTraduccionesRq('a', 'b', 'c', 'd');

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MultiIdiomaComponent, LoadingIndicatorComponent],
            imports: [BrowserAnimationsModule, SharedModule, FormsModule, HttpClientTestingModule],
            providers: [
                {
                    provide: MultiIdomaService,
                    useClass: MultiIdiomaServiceMock,
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MultiIdiomaComponent);
        component = fixture.componentInstance;
        service = TestBed.get(MultiIdomaService);
        component.ngOnInit();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('when HTTP Request fails', () => {
        beforeEach(() => {
            component.pKey = null;
            component.tabla = null;
            component.esquema = null;
            component.campo = null;
            fixture.detectChanges();
            elementRef = fixture.debugElement.nativeElement;
        });

        afterAll(() => {
            // TODO : Destroy component
        });

        it('should not get translations', () => {
            spyOn(service, 'getTraducciones')
                .withArgs(request)
                .and.callThrough();
            spyOn(component, 'showErrorAlert').and.callThrough();
            component.despliegaTraducciones();
            expect(service.getTraducciones).not.toHaveBeenCalled();
            expect(component.showErrorAlert).toHaveBeenCalled();
        });
    });

    describe('when HTTP Request is correct', () => {
        beforeEach(() => {
            component.pKey = request.pKey;
            component.tabla = request.tabla;
            component.esquema = request.esquema;
            component.campo = request.campo;
            fixture.detectChanges();
            elementRef = fixture.debugElement.nativeElement;
        });

        it('should get translations', () => {
            fixture.detectChanges();
            spyOn(service, 'getTraducciones')
                .withArgs(request)
                .and.callThrough();
            component.despliegaTraducciones();
            expect(service.getTraducciones).toHaveBeenCalled();
        });

        describe('and ordering by language code', () => {
            beforeEach(() => {
                component.orderByLangCod = false;
                fixture.detectChanges();
                elementRef = fixture.debugElement.nativeElement;
            });

            afterAll(() => {
                // TODO : Destroy component
            });

            it('should order the translations', () => {
                spyOn(service, 'getTraducciones')
                    .withArgs(request)
                    .and.callThrough();
                spyOn(component, 'ordenarTraducciones').and.callThrough();
                component.despliegaTraducciones();
                expect(service.getTraducciones).toHaveBeenCalled();
                expect(component.ordenarTraducciones).toHaveBeenCalled();
            });
        });

        describe('and the translations dialog is opened', () => {
            beforeEach(() => {
                component.elementosTraducciones = null;
                component.visualizarTablaTraducciones = false;
                fixture.detectChanges();
                spyOn(service, 'getTraducciones')
                    .withArgs(request)
                    .and.callThrough();
                component.despliegaTraducciones();
                expect(service.getTraducciones).toHaveBeenCalled();
            });

            afterAll(() => {
                // TODO : Destroy component
            });

            it('should show the spinner if elementosTraducciones is NULL', () => {
                component.elementosTraducciones = null;
                component.visualizarTablaTraducciones = true;
                fixture.detectChanges();
                elementRef = fixture.debugElement.nativeElement;
                const $spinner: HTMLElement = elementRef.querySelector('.ui-progress-spinner');

                expect($spinner).toBeDefined();
                expect($spinner).not.toBeNull();
                expect($spinner.style.display).not.toEqual('none');
            });

            it('should show an empty dialog', () => {
                component.elementosTraducciones = [];
                component.visualizarTablaTraducciones = true;
                fixture.detectChanges();
                elementRef = fixture.debugElement.nativeElement;
                const $spinner: HTMLElement = elementRef.querySelector('.ui-progress-spinner');
                const $grid: HTMLElement = elementRef.querySelector('.ui-grid-col-12');
                const $rows: HTMLElement[] = Array.from(
                    elementRef.querySelectorAll('.ui-grid-col-12 > .ui-grid-row')
                );
                expect($spinner).toBeNull();
                expect($grid).not.toBeNull();
                expect($rows).not.toBeNull();
                expect($rows.length).toBe(component.elementosTraducciones.length);
            });

            it('should show the dialog and one row per flag', () => {
                component.elementosTraducciones = mockService.translations;
                component.visualizarTablaTraducciones = true;
                fixture.detectChanges();
                elementRef = fixture.debugElement.nativeElement;
                const $spinner: HTMLElement = elementRef.querySelector('.ui-progress-spinner');
                const $grid: HTMLElement = elementRef.querySelector('.ui-grid-col-12');
                const $rows: HTMLElement[] = Array.from(
                    elementRef.querySelectorAll('.ui-grid-col-12 > .ui-grid-row')
                );
                const $buttons: HTMLButtonElement[] = Array.from(
                    elementRef.querySelectorAll('p-dialog p-footer button:not([hidden]')
                );
                // Spinner
                expect($spinner).toBeNull();
                // Grid
                expect($grid).not.toBeNull();
                expect($rows).not.toBeNull();
                expect($rows.length).toBe(component.elementosTraducciones.length);
                // Buttons
                expect($buttons.length).toBe(2);
                expect($buttons[0].innerText).toEqual('Aceptar');
                expect($buttons[1].innerText).toEqual('Salir');
            });

            it('should show the correct flag per language', () => {
                component.elementosTraducciones = mockService.translations;
                component.visualizarTablaTraducciones = true;
                fixture.detectChanges();
                elementRef = fixture.debugElement.nativeElement;
                const $grid: HTMLElement = elementRef.querySelector('.ui-grid-col-12');
                const $rows: HTMLElement[] = Array.from(
                    elementRef.querySelectorAll('.ui-grid-col-12 > .ui-grid-row')
                );

                let $flag: HTMLDivElement;
                let $button: HTMLButtonElement;
                component.elementosTraducciones.map((item: Traduccion, index: number) => {
                    if (item.idiomaPais) {
                        $flag = elementRef.querySelector(
                            `.bandera.bandera-${item.idiomaPais.toLowerCase()}`
                        );
                        expect($flag).not.toBeNull();
                    } else {
                        $flag = elementRef.querySelector('.bandera.sin-bandera');
                        expect($flag).not.toBeNull();
                    }

                    $button = $rows[index].querySelector('.ui-grid-row button');
                    expect($button).toBeNull();
                });

                expect($grid).not.toBeNull();
                expect($rows).not.toBeNull();
                expect($rows.length).toBe(component.elementosTraducciones.length);
                // Editor HTML should be hidden.
                const $editorDialog = elementRef.querySelector('p-editor');
                expect($editorDialog).toBeNull();
            });

            it('should show HTML Editor Button', () => {
                spyOn(component, 'mostrarDialogoEdicionHTML').and.callThrough();
                component.elementosTraducciones = mockService.translations;
                component.visualizarTablaTraducciones = true;
                component.habilitarEdicionHTML = true;
                fixture.detectChanges();
                elementRef = fixture.debugElement.nativeElement;
                const $rows: HTMLElement[] = Array.from(
                    elementRef.querySelectorAll('.ui-grid-col-12 > .ui-grid-row')
                );

                let $button: HTMLDivElement;
                $rows.map(($r) => {
                    $button = $r.querySelector('.ui-grid-row button');
                    expect($button).not.toBeNull();
                });
            });
        });

        describe('and the HTML Editor Dialog is opened', () => {
            let data;
            beforeEach(() => {
                spyOn(service, 'getTraducciones')
                    .withArgs(request)
                    .and.callThrough();
                spyOn(component, 'mostrarDialogoEdicionHTML').and.callThrough();

                component.elementosTraducciones = mockService.translations;
                component.visualizarTablaTraducciones = true;
                component.habilitarEdicionHTML = true;
                component.visualizarEdicionHTML = false;
                fixture.detectChanges();
                // Open first dialog about translations.
                component.despliegaTraducciones();
                expect(service.getTraducciones).toHaveBeenCalled();
                fixture.detectChanges();

                elementRef = fixture.debugElement.nativeElement;
                // Get the first element's data.
                data = component.elementosTraducciones[0];

                // Get first row and its HTML Editor button.
                const $row: HTMLElement = elementRef.querySelector(
                    '.ui-grid-col-12 > .ui-grid-row'
                );
                const $button: HTMLButtonElement = $row.querySelector('.ui-grid-row button');
                expect($button).not.toBeNull();

                // Click on first HTML Editor button
                testingMockEvents.triggerClickOn($button);
                fixture.detectChanges();
                expect(component.mostrarDialogoEdicionHTML).toHaveBeenCalledWith(data);
                elementRef = fixture.debugElement.nativeElement;
            });

            afterAll(() => {
                // TODO : Should destroy the component
            });

            it('should be active', () => {
                const $editorDialog = elementRef.querySelectorAll('p-dialog')[1];
                const $header: HTMLSpanElement = $editorDialog.querySelector(
                    'span.ui-dialog-title'
                );
                const translation = data.idiomaPaisTraduccion
                    ? data.idiomaPaisTraduccion
                    : data.idiomaPais;

                expect(component.visualizarTablaTraducciones).toBe(false);
                expect(component.visualizarEdicionHTML).toBe(true);
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
                    elementRef.querySelectorAll('p-dialog p-footer button:not([hidden]')
                );
                expect($footerButtons.length).toBe(2);
                expect($footerButtons[0].innerText).toEqual('Guardar');
                expect($footerButtons[1].innerText).toEqual('Salir');
            });

            it('should save', () => {
                spyOn(component, 'guardarCambiosHTML').and.callThrough();

                component.traduccionIdiomaHTML = 'TEST';
                component.traduccionTextoHTML =
                    '<div>Hello World!</div><div>PrimeNG <b>Editor</b> Rocks</div><div><br></div>';

                const $saveButton: Element = elementRef.querySelector(
                    'p-dialog p-footer button:not([hidden]'
                );

                testingMockEvents.triggerClickOn($saveButton);
                fixture.detectChanges();
                component.elementosTraducciones[0].idiomaPais = component.traduccionIdiomaHTML;
                component.elementosTraducciones[0].idiomaPaisTraduccion =
                    component.traduccionTextoHTML;
            });
        });
    });
});
