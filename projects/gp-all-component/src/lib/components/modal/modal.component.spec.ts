import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let $closeIcon: HTMLDivElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComponent],
      imports: [DialogModule, BrowserAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('emit modal hiding functionality', () => {
    it('should hide modal', fakeAsync(() => {
      spyOn(component, 'onHide').and.callThrough();
      component.visible = true;
      fixture.detectChanges();
      $closeIcon = fixture.nativeElement.querySelector('.ui-dialog-titlebar-close');
      $closeIcon.click();
      fixture.detectChanges();
      tick();
      expect(component.onHide).toHaveBeenCalled();
    }));
  });
});
