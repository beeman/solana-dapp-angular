import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppHeroComponent } from '../ui/ui-layout.component';
import { ClusterUiTableComponent } from './cluster-ui.component';
import { defaultClusters } from './cluster-data-access.component';

@Component({
  selector: 'dapp-cluster-feature',
  standalone: true,
  imports: [CommonModule, AppHeroComponent, ClusterUiTableComponent],
  template: `<div>
    <dapp-app-hero
      title="Clusters"
      subtitle="Manage and select your Solana clusters"
    >
      <!--      <dapp-app-modal />-->
      <button class="btn btn-xs lg:btn-md btn-primary">Add Cluster</button>
    </dapp-app-hero>
    <dapp-cluster-table [clusters]="defaultClusters" />
  </div>`,
  styles: ``,
})
export class ClusterFeatureComponent {
  defaultClusters = defaultClusters;
}
