import { GpAllComponentModule } from './../../../../gp-all-component/src/lib/gp-all-component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TesterRoutingModule } from './tester-routing.module';
import { TesterComponent } from './tester.component';

@NgModule({
    declarations: [TesterComponent],
    imports: [CommonModule, TesterRoutingModule, GpAllComponentModule],
    exports: [TesterComponent],
})
export class TesterModule {}
