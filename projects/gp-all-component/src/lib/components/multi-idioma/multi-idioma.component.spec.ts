import { FormsModule } from '@angular/forms';
import { LoadingIndicatorComponent } from './../loading-indicator/loading-indicator.component';
import { SharedModule } from './../../shared/shared.module';
import { MultiIdiomaServiceMock } from './multi-idioma-tester.mock';
import { MultiIdomaService } from './../../services/api/multi-idioma/multi-idioma.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiIdiomaComponent } from './multi-idioma.component';

describe('MultiIdiomaComponent', () => {
    let component: MultiIdiomaComponent;
    let fixture: ComponentFixture<MultiIdiomaComponent>;
    let service: MultiIdomaService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MultiIdiomaComponent, LoadingIndicatorComponent],
            imports: [SharedModule, FormsModule],
            providers: [{ provide: MultiIdomaService, useClass: MultiIdiomaServiceMock }],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MultiIdiomaComponent);
        component = fixture.componentInstance;
        service = fixture.debugElement.injector.get(MultiIdomaService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
