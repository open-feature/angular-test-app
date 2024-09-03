import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { OpenFeatureModule, InMemoryProvider } from '@openfeature/angular-sdk';

import { routes } from './app.routes';
import {
  CONTEXT_CHANGE_CONTEXT_KEY,
  CONTEXT_CHANGE_PROVIDER_NAME,
} from './demos/context-change/context-change.component';
import { DelayedInMemoryProvider } from './test-provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(
      OpenFeatureModule.forRoot({
        provider: new InMemoryProvider({}),
        domainBoundProviders: {
          [CONTEXT_CHANGE_PROVIDER_NAME]: new DelayedInMemoryProvider(
            {
              'go-fast': {
                disabled: false,
                variants: { on: true, off: false },
                defaultVariant: 'off',
                contextEvaluator: context =>
                  context[CONTEXT_CHANGE_CONTEXT_KEY] ? 'on' : 'off',
              },
            },
            2000
          ),
        },
      })
    ),
  ],
};
