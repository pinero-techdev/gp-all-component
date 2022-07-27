import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingIndicatorComponent } from './loading-indicator.component';
import { SharedModule } from '../../shared/shared.module';

describe('LoadingIndicatorComponent', () => {
    let component: LoadingIndicatorComponent;
    let fixture: ComponentFixture<LoadingIndicatorComponent>;
    let elementRef: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoadingIndicatorComponent],
            imports: [SharedModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoadingIndicatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        elementRef = fixture.nativeElement.querySelector('.p-progress-spinner');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(elementRef).toBeTruthy();
    });
});
