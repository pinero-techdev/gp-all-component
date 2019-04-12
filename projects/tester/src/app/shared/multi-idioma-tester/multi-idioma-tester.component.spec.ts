import { MultiIdomaService } from './../../../../gp-all-component/src/lib/services/api/multi-idioma/multi-idioma.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiIdiomaTesterComponent } from './multi-idioma-tester.component';
import { GpAllComponentModule } from '../../../../gp-all-component/src/lib/gp-all-component.module';

describe('MultiIdiomaTesterComponent', () => {
    let component: MultiIdiomaTesterComponent;
    let fixture: ComponentFixture<MultiIdiomaTesterComponent>;
    let elementRef: HTMLElement;
    let service: MultiIdomaService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MultiIdiomaTesterComponent],
            imports: [GpAllComponentModule],
            providers: [MultiIdomaService],
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
});
