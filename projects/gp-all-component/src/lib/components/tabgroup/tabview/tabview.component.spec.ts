import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabViewComponent } from './tabview.component';

fdescribe('TabViewComponent', () => {
  let component: TabViewComponent;
  let fixture: ComponentFixture<TabViewComponent>;
  let $tabgroup: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabViewComponent],
      imports: [],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Horizontal orientation', () => {
    beforeEach(() => {
      component.orientation = '';
      component.ngOnInit();
      fixture.detectChanges();
      $tabgroup = fixture.nativeElement.querySelector('ul');
    });

    it('should be horizontal', () => {
      expect($tabgroup).not.toHaveClass('vertical-orientation');
    });
  });

  describe('Vertical orientation', () => {
    beforeEach(() => {
      component.orientation = 'left';
      component.ngOnInit();
      fixture.detectChanges();
      $tabgroup = fixture.nativeElement.querySelector('ul');
    });

    it('should be vertical', () => {
      expect($tabgroup).toHaveClass('vertical-orientation');
    });
  });

  it('should select second tab', () => {
    const index = 1;
    component.selectTab(index);
    expect(component.activePosition).toEqual(index);
  });

  // it('gettemplate', () => {
  //   const activePosition = 0;
  //   component.activePosition = activePosition;
  //   component.getTemplate();
  //   expect(component.getTemplate()).not.toBeNull();
  // });
});
