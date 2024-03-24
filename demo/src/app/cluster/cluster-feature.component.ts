import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppHeroComponent, AppModalComponent } from '../ui/ui-layout.component';
import { ClusterUiTableComponent } from './cluster-ui.component';
import { defaultClusters } from './cluster-data-access.component';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'dapp-cluster-feature',
  standalone: true,
  imports: [CommonModule, AppHeroComponent, ClusterUiTableComponent],
  template: `<div>
    <dapp-app-hero
      title="Clusters"
      subtitle="Manage and select your Solana clusters"
    >
      <button (click)="open()" class="btn btn-xs lg:btn-md btn-primary">
        Add Cluster
      </button>
    </dapp-app-hero>
    <dapp-cluster-table [clusters]="defaultClusters" />
  </div>`,
  styles: ``,
})
export class ClusterFeatureComponent {
  defaultClusters = defaultClusters;

  constructor(public dialog: Dialog) {}

  open() {
    this.dialog.open(ModalAddClusterComponent, {
      minWidth: '300px',
      data: {
        button: 'Open',
      },
    });
  }
}

@Component({
  selector: 'dapp-modal-add-cluster',
  standalone: true,
  imports: [CommonModule, AppModalComponent],
  template: `
    <dapp-app-modal
      title="Add Cluster"
      hide="hideModal"
      show="show"
      submit=" save"
    >
      <input
        type="text"
        placeholder="Name"
        class="input input-bordered w-full"
        value="name"
      />
      <input
        type="text"
        placeholder="Endpoint"
        class="input input-bordered w-full"
        value="endpoint"
      />
      <select class="select select-bordered w-full" value="{network}">
        <option>Select a network</option>
        <option>Devnet</option>
        <option>Testnet</option>
        <option>Mainnet</option>
      </select>
    </dapp-app-modal>
  `,
})
export class ModalAddClusterComponent {
  // TODO: Logic to send airdrop
  doSubmit() {
    console.log('TEST');
  }
}
