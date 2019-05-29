import { FooTesterModule } from './../foo-tester/foo-tester.module';
import { FooTesterComponent } from './../foo-tester/foo-tester.component';
import { HomeRoutingModule } from './home.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomeComponent],
  entryComponents: [FooTesterComponent],
  imports: [CommonModule, SharedModule, FooTesterModule, HomeRoutingModule],
  exports: [FooTesterComponent, HomeComponent],
})
export class HomeModule {}
