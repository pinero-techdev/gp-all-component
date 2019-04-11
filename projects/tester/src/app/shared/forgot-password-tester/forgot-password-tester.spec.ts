import { ForgotPasswordTesterComponent } from './forgot-password-tester.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('ForgotPasswordTesterComponent', () => {
    let component: ForgotPasswordTesterComponent;
    let fixture: ComponentFixture<ForgotPasswordTesterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ForgotPasswordTesterComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ForgotPasswordTesterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
