import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RedirectComponent } from './redirect.component';
import { of } from 'rxjs/internal/observable/of';

fdescribe('RedirectComponent', () => {
    let component: RedirectComponent;
    let fixture: ComponentFixture<RedirectComponent>;
    // let router: Router;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([])],
            declarations: [RedirectComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        queryParams: of(),
                    },
                },
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RedirectComponent);
        component = fixture.componentInstance;
        // router = TestBed.get(Router);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // describe('when passed a new url', () => {
    //     it('should redirect to a new page', () => {
    //         const windowOpenSpy = spyOn(window, 'open');

    //         const urlPrefix = 'http://';
    //         const newUrl = 'localhost';

    //         TestBed.get(ActivatedRoute).queryParams = of({ url: newUrl, new: true });

    //         component.ngOnInit();

    //         expect(windowOpenSpy).toHaveBeenCalledWith(urlPrefix + newUrl);
    //     });

    //     it('should just change the url, but not redirect', () => {
    //         const windowOpenSpy = spyOn(window, 'open');
    //         const navigateSpy = spyOn(router, 'navigateByUrl');

    //         const urlPrefix = 'http://';
    //         const newUrl = 'test';

    //         TestBed.get(ActivatedRoute).queryParams = of({ url: newUrl, new: false });

    //         component.ngOnInit();

    //         expect(windowOpenSpy).not.toHaveBeenCalledWith(urlPrefix + newUrl);
    //         expect(navigateSpy).toHaveBeenCalledWith(urlPrefix + newUrl);
    //     });
    // });
});
