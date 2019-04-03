import { element } from '@angular/core/src/render3';
import { Traduccion } from './../../resources/data/traduccion.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LoadingIndicatorComponent } from './../loading-indicator/loading-indicator.component';
import { SharedModule } from './../../shared/shared.module';
import { MultiIdiomaServiceMock } from './multi-idioma.mock';
import {
    MultiIdomaService,
    GetTraduccionesRq,
    GetTraduccionesRs,
} from './../../services/api/multi-idioma/multi-idioma.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MultiIdiomaComponent } from './multi-idioma.component';
import { of } from 'rxjs';
import { TestingMockEvents } from '../../shared/testing/testing-mock-events.class';

describe('MultiIdiomaComponent', () => {
    let component: MultiIdiomaComponent;
    let fixture: ComponentFixture<MultiIdiomaComponent>;
    let service: MultiIdomaService;
    let elementRef: HTMLElement;
    const mockService = new MultiIdiomaServiceMock();
    const testingMockEvents = new TestingMockEvents();

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
        fixture.detectChanges();
        elementRef = fixture.debugElement.nativeElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get translations', () => {
        component.pKey = 'key';
        fixture.detectChanges();
        spyOn(service, 'getTraducciones').and.callThrough();
        component.despliegaTraducciones();
        expect(service.getTraducciones).toHaveBeenCalled();
    });

    describe('Testing the dialog', () => {
        beforeAll(() => {
            component.pKey = 'key';
            component.elementosTraducciones = null;
            component.visualizarTablaTraducciones = false;
            fixture.detectChanges();
            spyOn(service, 'getTraducciones').and.callThrough();
            component.despliegaTraducciones();
            expect(service.getTraducciones).toHaveBeenCalled();
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
        });

        it('should show HTML Edition Button', () => {
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
            $rows.map(($r, index) => {
                $button = $r.querySelector('.ui-grid-row button');
                expect($button).not.toBeNull();
            });
        });
    });
    describe('Testing the HTML Edition Dialog', () => {
        beforeAll(() => {
            component.pKey = 'key';
            component.elementosTraducciones = null;
            component.visualizarTablaTraducciones = false;
            fixture.detectChanges();
            spyOn(service, 'getTraducciones').and.callThrough();
            component.despliegaTraducciones();
            expect(service.getTraducciones).toHaveBeenCalled();
        });
        
        it('should show HTML Edition Dialog', () => {
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
            const elementToTest = 0;
            const $row = $rows[elementToTest];

            $button = $row.querySelector('.ui-grid-row button');
            expect($button).not.toBeNull();
            testingMockEvents.triggerClickOn($button);
            fixture.detectChanges();
            const data = component.elementosTraducciones[elementToTest];
            expect(component.mostrarDialogoEdicionHTML).toHaveBeenCalledWith(data);
            expect(component.visualizarTablaTraducciones).toBe(false);
            expect(component.visualizarEdicionHTML).toBe(true);
        });
    });
});
