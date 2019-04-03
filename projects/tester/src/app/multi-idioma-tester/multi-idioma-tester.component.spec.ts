import { MultiIdomaService, GetTraduccionesRq } from './../../../../gp-all-component/src/lib/services/api/multi-idioma/multi-idioma.service';
import { MultiIdiomaServiceMock } from './multi-idioma-tester.mock';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiIdiomaTesterComponent } from './multi-idioma-tester.component';
import { GpAllComponentModule } from '../../../../gp-all-component/src/lib/gp-all-component.module';
import { element } from '@angular/core/src/render3';

describe('MultiIdiomaTesterComponent', () => {
    let component: MultiIdiomaTesterComponent;
    let fixture: ComponentFixture<MultiIdiomaTesterComponent>;
    let elementRef: HTMLElement;
    let service: MultiIdomaService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MultiIdiomaTesterComponent],
            imports: [GpAllComponentModule],
            providers: [{ provide: MultiIdomaService, useClass: MultiIdiomaServiceMock }],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MultiIdiomaTesterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        elementRef = fixture.nativeElement;
        service = fixture.debugElement.injector.get(MultiIdomaService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    fit('should get countries', () => {
        component.pKey = 'a';
        fixture.detectChanges();
        spyOn(service, 'getTraducciones');
        const request = new GetTraduccionesRq(
            component.pKey,
            component.schema,
            component.tabla,
            component.campo
        );
        debugger;
        const componentRef = fixture.componentInstance.component;
        service.getTraducciones(request);
        // componentRef.despliegaTraducciones();
        expect(service.getTraducciones).toHaveBeenCalled();
    });
});
