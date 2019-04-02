import { GlobalService } from './global.service';
import { Optional, SkipSelf, NgModule } from '@angular/core';
import { ApiModule } from '../api/api.module';
import { GlobalSingletonService } from './global-singleton.service';

@NgModule({
    declarations: [],
    imports: [
      ApiModule
    ],
    exports: [],
    providers: [GlobalService, GlobalSingletonService]
  })
  
  export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
      if (parentModule) {
        throw new Error(
          'CoreModule is already loaded. Import it in the AppModule only');
      }
    }
  }