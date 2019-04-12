import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
    selector: 'app-multi-select-tester',
    templateUrl: './multi-select-tester.component.html',
    styleUrls: ['./multi-select-tester.component.scss'],
})
export class MultiSelectTesterComponent {
    public selectionOptions: SelectItem[] = [
        {
            label: 'Test 1',
            value: 'D34FG',
            icon: 'fa-file',
        },
        {
            label: 'Test 2',
            value: 'D43FA',
            icon: 'fa-file',
        },
    ];

    public onSelect(event: Event) {
        console.info(event);
    }
}
