import { ButtonComponent } from './button.component';
import { ButtonModule as PrimeButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule, PrimeButtonModule, SplitButtonModule],
  exports: [ButtonComponent],
  providers: [ButtonComponent],
})
export class ButtonModule {}
