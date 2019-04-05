import { MainMenuServiceMock } from './main-menu.mock';
import { MainMenuService } from '../../services/api/main-menu/main-menu.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MainMenuComponent } from './main-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';

describe('MainMenuComponent', () => {
    let component: MainMenuComponent;
    let fixture: ComponentFixture<MainMenuComponent>;
    let service: MainMenuServiceMock;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MainMenuComponent],
            imports: [SharedModule, RouterTestingModule],
            providers: [
                {
                    provide: MainMenuService,
                    useClass: MainMenuServiceMock,
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MainMenuComponent);
        component = fixture.componentInstance;
        service = TestBed.get(MainMenuService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // it('should init the menu', () => {
    //     spyOn(component, 'initMenu').and.callThrough();
    //     component.ngOnInit();
    //     fixture.detectChanges();
    //     expect(component.initMenu).toHaveBeenCalled();
    // });

    // it('should get the menu data', () => {
    //     spyOn(service, 'obtenMenu').and.callThrough();
    //     component.ngOnInit();
    //     fixture.detectChanges();

    //     component.menuItems.first().subscribe((data) => {
    //         console.info('spec', data);
    //     });

    //     expect(service.obtenMenu).toHaveBeenCalled();
    // });
});
