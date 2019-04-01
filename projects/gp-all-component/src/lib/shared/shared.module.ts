import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {ButtonModule} from 'primeng/button';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [],
    imports: [ButtonModule,
      ProgressSpinnerModule],
    exports: [ButtonModule, ProgressSpinnerModule],
})
export class SharedModule {}
