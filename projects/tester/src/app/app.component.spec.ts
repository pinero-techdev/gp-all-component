import { MainMenuTesterComponent } from './shared/main-menu-tester/main-menu-tester.component';
import {
    MultiIdiomaTesterComponent, //
} from './shared/multi-idioma-tester/multi-idioma-tester.component';
import {
    LoadingIndicatorTesterComponent, //
} from './shared/loading-indicator-tester/loading-indicator-tester.component';
import { GpAllComponentModule } from './../../../gp-all-component/src/lib/gp-all-component.module';
import { FooTesterComponent } from './foo-tester/foo-tester.component';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DynamicTesterComponent } from './shared/dynamic-tester/dynamic-tester.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                FooTesterComponent,
                DynamicTesterComponent,
                LoadingIndicatorTesterComponent,
                MainMenuTesterComponent,
                MultiIdiomaTesterComponent,
            ],
            imports: [GpAllComponentModule, RouterTestingModule],
            providers: [],
        }).compileComponents();
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });
});
