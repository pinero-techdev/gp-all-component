import { AuthGuard } from './auth-guard.service';
import { AuthGuardRedirect } from './auth-guard-redirect.service';
import { CommonService } from './common.service';
import { Optional, SkipSelf, NgModule } from '@angular/core';
import { ApiModule } from '../api/api.module';

@NgModule({
    declarations: [],
    imports: [
      ApiModule
    ],
    exports: [],
    providers: [
      AuthGuard,
      AuthGuardRedirect,
      CommonService
    ]
  })
  
  export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
      if (parentModule) {
        throw new Error(
          'CoreModule is already loaded. Import it in the AppModule only');
      }
    }
  }