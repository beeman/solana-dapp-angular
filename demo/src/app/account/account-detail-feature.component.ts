import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppHeroComponent } from '../ui/ui-layout.component';
import { RouterLink } from '@angular/router';
import {
  AccountBalanceComponent,
  AccountButtonsComponent,
  AccountTokensComponent,
  AccountTransactionsComponent,
} from './account-ui.component';
import {
  defaultTransactions,
  Transaction,
} from './account-data-access.component';

@Component({
  selector: 'dapp-account-detail-feature',
  standalone: true,
  imports: [
    CommonModule,
    AppHeroComponent,
    RouterLink,
    AccountButtonsComponent,
    AccountTokensComponent,
    AccountTransactionsComponent,
    AccountBalanceComponent,
  ],
  template: `
    <div>
      <dapp-app-hero>
        <dapp-account-balance [address]="address"></dapp-account-balance>
        <div class="my-4">
          <a
            routerLink="https://explorer.solana.com/address/CvQf1w1T828bRqfD6fA1rWdCR4ybCsEr6vwHdYPTMfSr?cluster=devnet"
          >
            {{ address }}
          </a>
        </div>
        <div class="my-4"><dapp-account-buttons /></div>
      </dapp-app-hero>
      <div class="space-y-8">
        <dapp-account-tokens [address]="address" />
        <dapp-account-transactions [transactions]="defaultTransactions" />
      </div>
    </div>
  `,
})
export class AccountDetailFeatureComponent {
  address = 'CvQf1w1T828bRqfD6fA1rWdCR4ybCsEr6vwHdYPTMfSr';
  defaultTransactions: Transaction[] = defaultTransactions;
}
