import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbModule as PrimeBreadcrumbModule } from 'primeng/breadcrumb';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [BreadcrumbComponent],
  imports: [CommonModule, PrimeBreadcrumbModule],
  exports: [BreadcrumbComponent],
  providers: [BreadcrumbComponent],
})
export class BreadcrumbModule {}
