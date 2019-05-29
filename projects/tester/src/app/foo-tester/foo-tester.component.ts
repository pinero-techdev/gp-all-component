import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-foo-tester',
  templateUrl: './foo-tester.component.html',
  styleUrls: ['./foo-tester.component.scss'],
})
export class FooTesterComponent {
  @Input() foo: string;
  @Input() bar: string[];
  @Output() fooEmitter = new EventEmitter<any>();
}
