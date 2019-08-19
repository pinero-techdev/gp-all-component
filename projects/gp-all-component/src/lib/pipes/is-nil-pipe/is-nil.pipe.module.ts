import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsNilPipe } from './is-nil.pipe';

@NgModule({
  declarations: [IsNilPipe],
  imports: [CommonModule],
  exports: [IsNilPipe],
})
export class IsNilPipeModule {}
