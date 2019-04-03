import { MultiIdiomaTesterComponent } from './multi-idioma-tester/multi-idioma-tester.component';
import { MenuTesterComponent } from './menu-tester/menu-tester.component';
import { LoadingIndicatorTesterComponent } from './loading-indicator-tester/loading-indicator-tester.component';
import { GpAllComponentModule } from './../../../gp-all-component/src/lib/gp-all-component.module';
import { FooTesterComponent } from './foo-tester/foo-tester.component';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DynamicTesterComponent } from './dynamic-tester/dynamic-tester.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                FooTesterComponent,
                DynamicTesterComponent,
                LoadingIndicatorTesterComponent,
                MenuTesterComponent,
                MultiIdiomaTesterComponent,
            ],
            imports: [GpAllComponentModule, RouterTestingModule],
            providers:[]
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
});
