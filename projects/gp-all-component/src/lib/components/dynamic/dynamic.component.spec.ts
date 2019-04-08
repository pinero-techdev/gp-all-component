import { DynamicComponent, DynamicMetadata } from './dynamic.component';
import { Component, ComponentFactoryResolver } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

@Component({
    selector: 'gp-test-hosted',
    template: 'templ',
})
class HostedComponent {
    content: string;
}

describe('DynamicComponent', () => {
    let fixture: ComponentFixture<DynamicComponent>;
    let component: DynamicComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ComponentFactoryResolver],
            declarations: [HostedComponent, DynamicComponent],
        });

        // some sort of hack to get this working
        // https://github.com/angular/angular/issues/10760
        TestBed.overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [HostedComponent],
            },
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DynamicComponent);
        component = fixture.componentInstance;
    });

    it('should create', async () => {
        expect(fixture.componentInstance).toBeTruthy();
    });

    xit('should instantiatе hosted component correctly', async () => {
        const data: DynamicMetadata = {
            component: HostedComponent,
        };
        component.componentData = data;
        // component.ngOnInit();
        fixture.detectChanges();
        expect(fixture.componentInstance.dynamicComponent.length).toBe(1);
    });
});
