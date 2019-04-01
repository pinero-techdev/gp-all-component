import { GpAllComponentModule } from 'gp-all-component/gp-all-component.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingIndicatorTesterComponent } from './loading-indicator-tester.component';

const message = 'Retrieving data';
const height = '60px';
const width = '60px';
describe('LoadingIndicatorTesterComponent', () => {
    let component: LoadingIndicatorTesterComponent;
    let fixture: ComponentFixture<LoadingIndicatorTesterComponent>;
    let elementRef: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoadingIndicatorTesterComponent],
            imports: [GpAllComponentModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoadingIndicatorTesterComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        elementRef = fixture.nativeElement.querySelector(
            '.ui-progress-spinner'
        );
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a visible spinner', () => {
        expect(elementRef).toBeTruthy();
        expect(elementRef.style.display).not.toEqual('none');
    });

    it('should have a custom spinner', () => {
        const $message = fixture.nativeElement.querySelector('span');
        component.msg = message;
        component.w = height;
        component.h = width;
        fixture.detectChanges();
        expect(elementRef.style.display).not.toEqual('none');
        expect(elementRef.style.height).toEqual(height);
        expect(elementRef.style.width).toEqual(width);
        expect($message.innerText).toEqual(message);
    });
});
