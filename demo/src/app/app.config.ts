import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideWalletAdapter } from '@heavy-duty/wallet-adapter';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withComponentInputBinding()),
    provideWalletAdapter(undefined, { commitment: 'confirmed' }),
    provideAnimationsAsync(),
  ],
};
