import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'dapp-account-list-feature',
  standalone: true,
  imports: [CommonModule, HdWalletMultiButtonComponent, RouterLink],
  template: `
    @if(publicKey()){
    <div>
      <a [routerLink]="['account/:c']">{{ publicKey() }}</a>
    </div>
    }@else{
    <div class=" py-64">
      <div class="text-center">
        <hd-wallet-multi-button></hd-wallet-multi-button>
      </div>
    </div>
    }
  `,
})
export class AccountListFeatureComponent {
  private readonly walletStore = inject(WalletStore);
  private readonly router = inject(Router);

  readonly publicKey = toSignal(this.walletStore.publicKey$);

  constructor() {
    effect(() => {
      if (this.publicKey()) {
        this.router.navigateByUrl(`/account/${this.publicKey()}`);
      }
    });
  }
}
