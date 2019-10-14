import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlErrorComponent } from './control-error.component';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/primeng';

describe('ControlErrorComponent', () => {
  let component: ControlErrorComponent;
  let fixture: ComponentFixture<ControlErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ControlErrorComponent],
      imports: [MessageModule, MessagesModule],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
