import { FooTesterRoutingModule } from './foo-tester.routing.module';
import { FooTesterComponent } from './../foo-tester/foo-tester.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [FooTesterComponent],
    imports: [CommonModule, SharedModule, FooTesterRoutingModule],
    exports: [FooTesterComponent],
})
export class FooTesterModule {}
