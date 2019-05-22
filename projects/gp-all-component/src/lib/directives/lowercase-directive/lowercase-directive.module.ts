import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LowercaseDirective } from './lowercase.directive';

@NgModule({
  declarations: [LowercaseDirective],
  imports: [CommonModule],
  exports: [LowercaseDirective],
})
export class LowercaseDirectiveModule {}
