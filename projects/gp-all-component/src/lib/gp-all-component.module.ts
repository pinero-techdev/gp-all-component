import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooComponent } from './foo/foo.component';
import { BarComponent } from './bar/bar.component';

@NgModule({
    declarations: [FooComponent, BarComponent],
    imports: [CommonModule],
    exports: [FooComponent, BarComponent],
})
export class GpAllComponentModule {}
