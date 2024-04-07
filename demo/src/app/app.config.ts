import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideWalletAdapter } from '@heavy-duty/wallet-adapter';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideAngularQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withComponentInputBinding()),
    provideWalletAdapter(undefined, { commitment: 'confirmed' }),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideAngularQuery(new QueryClient()),
  ],
};
