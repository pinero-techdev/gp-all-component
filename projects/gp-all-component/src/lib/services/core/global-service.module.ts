import { ModuleWithProviders } from '@angular/compiler/src/core';
import { GlobalService } from './global.service';
import { environmentBase } from '../../util/environment';
import { NgModule } from '@angular/core';

@NgModule({})
export class GlobalServiceModule {
  public static forRoot(environment: any): ModuleWithProviders {
    this.setGlobal(environment);

    return {
      ngModule: GlobalServiceModule,
      providers: [
        {
          provide: 'env',
          useValue: environment,
        },
      ],
    };
  }

  private static setGlobal(environment: any) {
    const env = { ...environmentBase, ...environment };
    GlobalService.setBaseUrl(env.baseUrl);
    GlobalService.setLoginServiceUrl(env.loginUrl);
    GlobalService.setMenuServiceUrl(env.menuUrl);
    GlobalService.setApp(env.appName);
    GlobalService.setAplicacionLogin(env.appName);
    GlobalService.setLogged(false);
    GlobalService.setApplicationTitle(env.appTitle);
  }
}
