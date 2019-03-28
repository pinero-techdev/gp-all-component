import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicComponent } from './dynamic.component';

<<<<<<< HEAD:projects/gp-all-component-app/src/app/tester/tester.component.spec.ts
import { TesterComponent } from './tester.component';

describe('TesterComponent', () => {
    let component: TesterComponent;
    let fixture: ComponentFixture<TesterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TesterComponent],
=======
describe('DynamicComponent', () => {
    let component: DynamicComponent;
    let fixture: ComponentFixture<DynamicComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DynamicComponent],
>>>>>>> DynamicComponent: UT and refactor implementation:projects/gp-all-component/src/lib/components/dynamic/dynamic.component.spec.ts
        }).compileComponents();
    }));

    beforeEach(() => {
<<<<<<< HEAD:projects/gp-all-component-app/src/app/tester/tester.component.spec.ts
        fixture = TestBed.createComponent(TesterComponent);
=======
        fixture = TestBed.createComponent(DynamicComponent);
>>>>>>> DynamicComponent: UT and refactor implementation:projects/gp-all-component/src/lib/components/dynamic/dynamic.component.spec.ts
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
