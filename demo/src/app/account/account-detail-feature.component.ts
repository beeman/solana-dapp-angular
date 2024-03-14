import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppHeroComponent } from '../ui/ui-layout.component';
import { RouterLink } from '@angular/router';
import {
  AccountButtonsComponent,
  AccountTokensComponent,
  AccountTransactionsComponent,
} from './account-ui.component';
import {
  Account,
  Transaction,
  defaultAccounts,
  defaultTransactions,
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
  ],
  template: `
    <div>
      <dapp-app-hero>
        <div class="my-4">100 SOL</div>
        <div class="my-4">
          <a
            routerLink="https://explorer.solana.com/address/CvQf1w1T828bRqfD6fA1rWdCR4ybCsEr6vwHdYPTMfSr?cluster=devnet"
            >CvQf1w1T828bRqfD6fA1rWdCR4ybCsEr6vwHdYPTMfSr</a
          >
        </div>
        <div class="my-4"><dapp-account-buttons /></div>
      </dapp-app-hero>
      <div class="space-y-8">
        <dapp-account-tokens [accounts]="defaultAccounts" />
        <dapp-account-transactions [transactions]="defaultTransactions" />
      </div>
    </div>
  `,
})
export class AccountDetailFeatureComponent {
  defaultAccounts: Account[] = defaultAccounts;
  defaultTransactions: Transaction[] = defaultTransactions;
}
