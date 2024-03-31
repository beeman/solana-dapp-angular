import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { AppHeroComponent } from '../ui/ui-layout.component';
import {
  CounterCardComponent,
  CounterCreateComponent,
} from './counter-ui.component';
import { Counter, defaultCounters } from './counter-data-access.component';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'dapp-counter-feature',
  standalone: true,
  imports: [
    CommonModule,
    AppHeroComponent,
    CounterCreateComponent,
    CounterCardComponent,
    HdWalletMultiButtonComponent,
    RouterLink,
  ],
  template: `
    @if(publicKey()){
    <div>
      <dapp-app-hero>
        <h1>Counter</h1>
        <h3>
          Create a new account by clicking the "Create" button. The state of a
          account is stored on-chain and can be manipulated by calling the
          program's methods (increment, decrement, set, and close).
        </h3>
        <p class="mb-6">
          <a>Id wallet</a>
        </p>
        <dapp-counter-create />
      </dapp-app-hero>

      <dapp-counter-card [counters]="defaultCounters" />
    </div>
    }@else{
    <div class="max-w-4xl mx-auto">
      <div class="hero py-[64px]">
        <div class="hero-content text-center">
          <hd-wallet-multi-button></hd-wallet-multi-button>
        </div>
      </div>
    </div>
    }
  `,
})
export class CounterFeatureComponent {
  defaultCounters: Counter[] = defaultCounters;

  private readonly walletStore = inject(WalletStore);

  readonly publicKey = toSignal(this.walletStore.publicKey$);
}
