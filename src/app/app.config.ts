import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { OpenFeatureModule, InMemoryProvider } from '@openfeature/angular-sdk';

import { routes } from './app.routes';
import {
  CONTEXT_CHANGE_PROVIDER,
  CONTEXT_CHANGE_PROVIDER_NAME,
} from './demos/context-change/context-change.component';
import {
  FLAG_CHANGE_PROVIDER,
  FLAG_CHANGE_PROVIDER_NAME,
} from './demos/flag-change/flag-change.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(
      OpenFeatureModule.forRoot({
        provider: new InMemoryProvider({}),
        domainBoundProviders: {
          [CONTEXT_CHANGE_PROVIDER_NAME]: CONTEXT_CHANGE_PROVIDER,
          [FLAG_CHANGE_PROVIDER_NAME]: FLAG_CHANGE_PROVIDER,
        },
      })
    ),
  ],
};
