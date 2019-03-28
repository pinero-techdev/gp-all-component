import { DynamicComponent } from './components/dynamic/dynamic.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [DynamicComponent],
    imports: [CommonModule],
    exports: [DynamicComponent],
})
export class GpAllComponentModule {}
