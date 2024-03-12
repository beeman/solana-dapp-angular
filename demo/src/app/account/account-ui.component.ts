import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Account } from './account-data-access.component';

@Component({
  selector: 'dapp-account-ui',
  standalone: true,
  imports: [CommonModule],
  template: ` <div>
      <h1 class="text-5xl font-bold cursor-pointer">Balance</h1>
    </div>

    <div class="space-y-2">
      <div class="flex justify-between">
        <h2 class="text-2xl font-bold">Transaction History</h2>
        <div class="space-x-2">
          <span class="loading loading-spinner"></span>
          <button class="btn btn-sm btn-outline">
            <!--            <IconRefresh />-->
          </button>
        </div>
      </div>
      <pre class="alert alert-error">Error: </pre>

      <div>
        <div>No transactions found.</div>

        <table
          class="table border-4 rounded-lg border-separate border-base-300"
        >
          <thead>
            <tr>
              <th>Signature</th>
              <th class="text-right">Slot</th>
              <th>Block Time</th>
              <th class="text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="font-mono">
                <a></a>
              </th>
              <td class="font-mono text-right">
                <a></a>
                <a></a>
              </td>
              <td></td>
              <td class="text-right">
                <div class="badge badge-error">Failed</div>

                <div class="badge badge-success">Success</div>
              </td>
            </tr>

            <tr>
              <td colSpan="{4}" class="text-center">
                <button class="btn btn-xs btn-outline"></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>`,
})
export class AccountUiComponent {}

@Component({
  selector: 'dapp-account-buttons',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-x-2">
      <button class="btn btn-xs lg:btn-md btn-outline">Airdrop</button>
      <button class="btn btn-xs lg:btn-md btn-outline">Send</button>
      <button class="btn btn-xs lg:btn-md btn-outline">Receive</button>
    </div>
  `,
  styles: ``,
})
export class AccountButtonsComponent {}

@Component({
  selector: 'dapp-account-tokens',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-2">
      <div class="justify-between">
        <div class="flex justify-between">
          <h2 class="text-2xl font-bold">Token Accounts</h2>
          <div class="space-x-2">
            <!--            <span class="loading loading-spinner"></span>-->

            <button class="btn btn-sm btn-outline">
              <!--              <iconRefresh></iconRefresh>-->
            </button>
          </div>
        </div>
      </div>
      <!--      <pre class="alert alert-error"></pre>-->

      <div>
        <!--        <div>No token accounts found.</div>-->
        <table
          class="table border-4 rounded-lg border-separate border-base-300"
        >
          <thead>
            <tr>
              <th>Public Key</th>
              <th>Mint</th>
              <th class="text-right">Balance</th>
            </tr>
          </thead>
          <tbody>
            @for(account of accounts; track account){
            <tr>
              <td>
                <div class="flex space-x-2">
                  <span class="font-mono">
                    <a>{{ account.publicKey }}</a>
                  </span>
                </div>
              </td>
              <td>
                <div class="flex space-x-2">
                  <span class="font-mono">
                    <a>{{ account.mint }}</a>
                  </span>
                </div>
              </td>
              <td class="text-right">
                <span class="font-mono">{{ account.amount }}</span>
              </td>
            </tr>

            <tr>
              <td class="text-center">
                <!--                <button class="btn btn-xs btn-outline"></button>-->
              </td>
            </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: ``,
})
export class AccountTokensComponent {
  @Input() accounts: Account[] = [];
}
