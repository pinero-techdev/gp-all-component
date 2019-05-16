import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WysiwygTesterComponent } from './wysiwyg-tester.component';

describe('WysiwygTesterComponent', () => {
  let component: WysiwygTesterComponent;
  let fixture: ComponentFixture<WysiwygTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WysiwygTesterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WysiwygTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
