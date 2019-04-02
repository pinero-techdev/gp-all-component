import { NgModule } from '@angular/core';
import { LanguageApiService } from './language/language-api.service';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
      CommonModule
    ],
    exports: [],
    providers: [
        LanguageApiService
    ]
  })
  
  export class ApiModule {
  }
  