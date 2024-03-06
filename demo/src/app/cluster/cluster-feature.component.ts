import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppHeroComponent, AppTableComponent } from '../ui/ui-layout.component';

@Component({
  selector: 'dapp-cluster-feature',
  standalone: true,
  imports: [CommonModule, AppHeroComponent, AppTableComponent],
  template: `<div>
    <dapp-app-hero
      title="Clusters"
      subtitle="Manage and select your Solana clusters"
    >
      <!--      <dapp-app-modal />-->
      <button class="btn btn-xs lg:btn-md btn-primary">Add Cluster</button>
    </dapp-app-hero>
    <!--    <ClusterUiTable />-->
    <dapp-app-table />
  </div>`,
  styles: ``,
})
export class ClusterFeatureComponent {}
