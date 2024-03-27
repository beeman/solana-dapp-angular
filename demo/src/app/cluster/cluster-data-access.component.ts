import { inject, Injectable } from '@angular/core';
import { clusterApiUrl, Connection } from '@solana/web3.js';
import { LocalStorageService } from 'ngx-localstorage';

export interface Cluster {
  name: string;
  endpoint: string;
  network?: ClusterNetwork;
  active?: boolean;
}

export enum ClusterNetwork {
  Mainnet = 'mainnet-beta',
  Testnet = 'testnet',
  Devnet = 'devnet',
  Custom = 'custom',
}
// By default, we don't configure the mainnet-beta cluster
// The endpoint provided by clusterApiUrl('mainnet-beta') does not allow access from the browser due to CORS restrictions
// To use the mainnet-beta cluster, provide a custom endpoint
export const defaultClusters: Cluster[] = [
  {
    name: 'devnet',
    endpoint: clusterApiUrl('devnet'),
    network: ClusterNetwork.Devnet,
  },
  { name: 'local', endpoint: 'http://localhost:8899' },
  {
    name: 'testnet',
    endpoint: clusterApiUrl('testnet'),
    network: ClusterNetwork.Testnet,
  },
];

const STORAGE_KEY_CLUSTER = 'solana-cluster';
const STORAGE_KEY_CLUSTERS = 'solana-clusters';

@Injectable({ providedIn: 'root' })
export class ClusterService {
  readonly storage = inject(LocalStorageService);

  get cluster() {
    return this.clusters.find((c) => c.active) || defaultClusters[0];
  }

  get clusters() {
    const items = (
      this.storage.get<Cluster[]>(STORAGE_KEY_CLUSTERS) || defaultClusters
    ).sort((a, b) => (a.name > b.name ? 1 : -1));
    const cluster =
      this.storage.get<Cluster>(STORAGE_KEY_CLUSTER) || defaultClusters[0];
    return items.map((i) => ({
      ...i,
      active: i.name === cluster.name,
    }));
  }

  addCluster(cluster: Cluster) {
    try {
      new Connection(cluster.endpoint);
      this.storage.set(STORAGE_KEY_CLUSTERS, [...this.clusters, cluster]);
    } catch (err) {
      // TODO: Refactor to toast/notification so it's visible to the user
      console.log(`Error adding cluster: ${err}`);
    }
  }

  deleteCluster(cluster: Cluster) {
    this.storage.set(STORAGE_KEY_CLUSTERS, [
      ...this.clusters.filter((c) => c.name !== cluster.name),
    ]);
  }

  setCluster(cluster: Cluster) {
    this.storage.set(STORAGE_KEY_CLUSTER, cluster);
  }

  getExplorerUrl(path: string) {
    return `https://explorer.solana.com/${path}${getClusterUrlParam(
      this.cluster
    )}`;
  }
}

function getClusterUrlParam(cluster: Cluster): string {
  let suffix = '';
  switch (cluster.network) {
    case ClusterNetwork.Devnet:
      suffix = 'devnet';
      break;
    case ClusterNetwork.Mainnet:
      suffix = '';
      break;
    case ClusterNetwork.Testnet:
      suffix = 'testnet';
      break;
    default:
      suffix = `custom&customUrl=${encodeURIComponent(cluster.endpoint)}`;
      break;
  }

  return suffix.length ? `?cluster=${suffix}` : '';
}
