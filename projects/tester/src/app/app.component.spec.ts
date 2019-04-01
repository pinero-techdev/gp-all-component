import { LoadingIndicatorTesterComponent } from './loading-indicator-tester/loading-indicator-tester.component';
import { GpAllComponentModule } from './../../../gp-all-component/src/lib/gp-all-component.module';
import { FooTesterComponent } from './foo-tester/foo-tester.component';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DynamicTesterComponent } from './dynamic-tester/dynamic-tester.component';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                FooTesterComponent,
                DynamicTesterComponent,
                LoadingIndicatorTesterComponent,
            ],
            imports: [GpAllComponentModule],
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        console.info(app);
        expect(app).toBeTruthy();
    });
});
