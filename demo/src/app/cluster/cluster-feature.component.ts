import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AppHeroComponent, AppModalComponent } from '../ui/ui-layout.component';
import { ClusterUiTableComponent } from './cluster-ui.component';
import { ClusterService } from './cluster-data-access.component';
import { Dialog } from '@angular/cdk/dialog';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
    <dapp-cluster-table [clusters]="clusterService.clusters" />
  </div>`,
  styles: ``,
})
export class ClusterFeatureComponent {
  clusterService = inject(ClusterService);

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
  imports: [CommonModule, AppModalComponent, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="doSubmit()">
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
          formControlName="name"
        />
        <input
          type="text"
          placeholder="Endpoint"
          class="input input-bordered w-full"
          value="endpoint"
          formControlName="endpoint"
        />
        <select class="select select-bordered w-full" value="{network}">
          <option>Select a network</option>
          <option>Devnet</option>
          <option>Testnet</option>
          <option>Mainnet</option>
        </select>
      </dapp-app-modal>
    </form>
  `,
})
export class ModalAddClusterComponent {
  form: FormGroup;
  constructor() {
    this.form = new FormGroup({
      name: new FormControl(''),
      endpoint: new FormControl(''),
      network: new FormControl(''),
    });
  }

  clusterService = inject(ClusterService);

  doSubmit() {
    this.clusterService.addCluster(this.form.value);
    console.log(this.form.value);
  }
}
