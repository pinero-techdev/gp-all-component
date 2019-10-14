import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';
import { TabDirective } from './tab.directive';

@Component({
  template: `
    <ng-template gpTab tabTitle="Tab1">
      <div class="tab-panel">
        <h3>Tab1 title</h3>
        <p>Tab1 panel content.</p>
      </div>
    </ng-template>
  `,
})
class TestTabComponent {
  @ViewChild(TabDirective) tab: TabDirective;
}

xdescribe('TabDirective', () => {
  let component: TestTabComponent;
  let fixture: ComponentFixture<TestTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabDirective, TestTabComponent],
      imports: [FormsModule],
      providers: [NgControl],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTabComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Tab Title', () => {
    expect(component.tab.tabTitle).toEqual('Tab1');
  });

  it('should get ElementRef', () => {
    expect(component.tab.getElementRef()).toEqual(component.tab.template);
  });
});
