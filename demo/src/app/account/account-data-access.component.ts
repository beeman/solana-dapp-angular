import { from, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { toSignal } from '@angular/core/rxjs-interop';

export interface Account {
  publicKey: string;
  mint: string;
  amount: string;
}

export interface Transaction {
  signature: string;
  slot: string;
  blockTime: string;
  status: string;
}

export const defaultAccounts: Account[] = [
  {
    publicKey: 'CvQf1w1T828bRqfD6fA1rWdCR4ybCsEr6vwHdYPTMfSr',
    mint: 'KinD3xAzuqX3LJbxUG13peGnqjpV5dRcHV8tsdsrbeZ',
    amount: '2000',
  },
  {
    publicKey: '5R6mXMBARq5fS2utygVpYmBjE437y6v7oKj3MXj6gxkz',
    mint: 'KinD3xAzuqX3LJbxUG13peGnqjpV5dRcHV8tsdsrbeZ',
    amount: '4000',
  },
];
export const defaultTransactions: Transaction[] = [
  {
    signature: '5R6mXMBARq5fS2utygVpYmBjE437y6v7oKj3MXj6gxkz',
    slot: 'KinD3xAzuqX3LJbxUG13peGnqjpV5dRcHV8tsdsrbeZ',
    blockTime: '2024-02-20T13:02:49.000Z',
    status: 'Success',
  },
  {
    signature: '5R6mXMBARq5fS2utygVpYmBjE437y6v7oKj3MXj6gxkz',
    slot: 'KinD3xAzuqX3LJbxUG13peGnqjpV5dRcHV8tsdsrbeZ',
    blockTime: '2024-02-20T13:02:49.000Z',
    status: 'Success',
  },
];
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private readonly connection = new Connection(clusterApiUrl('devnet'));
  private readonly _key = 'BJyq3roxaYEsPTs2';

  getBalance(publicKey: string | undefined | null) {
    if (!publicKey) {
      return of(null);
    }
    return from(this.connection.getBalance(new PublicKey(publicKey)));
  }
}
