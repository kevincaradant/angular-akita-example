import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import 'hammerjs';
import { SessionService } from './../shared/states/session/session.service';

import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { LANGUAGES } from 'app/core/injection-tokens';
import {
  initRuntimeEnvironment,
  RuntimeEnvironmentService,
} from 'app/core/runtime-environment.service';
import { httpLoaderFactory } from 'app/shared/helpers/aot.helper';
import { UiService } from 'app/shared/states/ui/ui.service';
import { environment } from 'environments/environment';

/**
 * this module will be imported only once, in AppModule and shouldn't be imported from anywhere else
 * you can define here the modules and providers that you only want to import once
 */
@NgModule({
  imports: [
    // --------------------------------------------------------------------
    // START : Do not add your libs here
    BrowserAnimationsModule,
    HttpClientModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: LANGUAGES,
      // order matters : The first one will be used by default
      // to be accurate, it will depend if you've set environment.useBrowserLanguageAsDefault to true or not
      // firt language of the following array
      // if it's set to true, it'll first try to use the browser language and if not available, fallback to the
      useValue: ['en', 'fr'],
    },
    RuntimeEnvironmentService,
    {
      provide: APP_INITIALIZER,
      useFactory: initRuntimeEnvironment,
      deps: [RuntimeEnvironmentService],
      multi: true,
    },
    {
      provide: UiService,
    },
    UiService,
    SessionService,
  ],
})
export class CoreModule {}
