import {Injectable, OnDestroy} from '@angular/core';
import {fromJS, List as makeList, Map as makeMap, OrderedMap as makeOrderedMap} from 'immutable';
import {StateService} from './state.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {TopologyUtilsService} from './utils/topology-utils.service';

@Injectable({
  providedIn: 'root'
})
export class InitService implements OnDestroy {
  private destroySubject$: Subject<void> = new Subject();
  private state;

  constructor(private State: StateService,
              private TopologyUtils: TopologyUtilsService) {
    this.State.currentState.pipe(takeUntil(this.destroySubject$)).subscribe(state => this.state = state);

    this.calcSelectType = this.calcSelectType.bind(this);
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }

  init() {
    this.processTopologies();
    const currentTopologyId = this.state.get('currentTopologyId');
    if (!currentTopologyId || !this.TopologyUtils.findTopologyById(this.state.get('topologies'), currentTopologyId)) {
      this.state = this.state.set('currentTopologyId', this.getDefaultTopology(this.state.get('topologies')));
    }
    this.state = this.TopologyUtils.setTopology(this.state, this.state.get('currentTopologyId'));

    // Expand topology options with topologies' defaults on first load, but let
    // the current state of topologyOptions (which at this point reflects the
    // URL state) still take the precedence over defaults.
    if (!this.state.get('topologiesLoaded')) {
      const options = this.getDefaultTopologyOptions().mergeDeep(this.state.get('topologyOptions'));
      this.state = this.state.set('topologyOptions', options);
      this.state = this.state.set('topologiesLoaded', true);
    }

    const nodes = {
      nodes: {
        'pseudo:unmanaged:': {
          id: 'pseudo:unmanaged:',
          label: 'Unmanaged',
          labelMinor: 0,
          rank: 'unmanaged:',
          shape: 'square',
          stack: true,
          pseudo: true,
          adjacency: [
            'pseudo:unmanaged:'
          ]
        },
        'f6dfd773-58c8-11e9-80d7-ce3760099703;\\u003cdeployment\\u003e': {
          id: 'f6dfd773-58c8-11e9-80d7-ce3760099703;\\u003cdeployment\\u003e',
          label: 'isartnavarro-io',
          labelMinor: 'Deployment of 1 pod',
          rank: 'isartnavarro-io/isartnavarro-io',
          shape: 'heptagon',
          stack: true,
          metadata: [
            {
              id: 'kubernetes_node_type',
              label: 'Type',
              value: 'Deployment',
              priority: 1
            },
            {
              id: 'kubernetes_namespace',
              label: 'Namespace',
              value: 'isartnavarro-io',
              priority: 2
            },
            {
              id: 'kubernetes_created',
              label: 'Created',
              value: '2019-04-07T00:06:17Z',
              priority: 3,
              dataType: 'datetime'
            },
            {
              id: 'kubernetes_observed_generation',
              label: 'Observed gen.',
              value: 8,
              priority: 4,
              dataType: 'number'
            },
            {
              id: 'kubernetes_desired_replicas',
              label: 'Desired replicas',
              value: 1,
              priority: 5,
              dataType: 'number'
            },
            {
              id: 'pod',
              label: '# Pods',
              value: 1,
              priority: 6,
              dataType: 'number'
            },
            {
              id: 'kubernetes_strategy',
              label: 'Strategy',
              value: 'Recreate',
              priority: 7
            }
          ],
          metrics: [
            {
              id: 'docker_cpu_total_usage',
              label: 'CPU',
              format: 'percent',
              value: 0,
              priority: 1,
              samples: null,
              min: 0,
              max: 100,
              url: 0
            },
            {
              id: 'docker_memory_usage',
              label: 'Memory',
              format: 'filesize',
              value: 21700608,
              priority: 2,
              samples: null,
              min: 21700608,
              max: 4138700800,
              url: 0
            }
          ],
          tables: [
            {
              id: 'kubernetes_labels_',
              label: 'Kubernetes labels',
              type: 'property-list',
              columns: null,
              rows: [
                {
                  id: 'label_k8s-app',
                  entries: {
                    value: 'isartnavarro-io',
                    label: 'k8s-app'
                  }
                }
              ]
            }
          ]
        },
        'd42c1e96-5aef-11e9-80d7-ce3760099703;\\u003cdeployment\\u003e': {
          id: 'd42c1e96-5aef-11e9-80d7-ce3760099703;\\u003cdeployment\\u003e',
          label: 'inaregames-com-bots',
          labelMinor: 'Deployment of 1 pod',
          rank: 'inaregames-com/inaregames-com-bots',
          shape: 'heptagon',
          stack: true,
          metadata: [
            {
              id: 'kubernetes_node_type',
              label: 'Type',
              value: 'Deployment',
              priority: 1
            },
            {
              id: 'kubernetes_namespace',
              label: 'Namespace',
              value: 'inaregames-com',
              priority: 2
            },
            {
              id: 'kubernetes_created',
              label: 'Created',
              value: '2019-04-09T17:49:31Z',
              priority: 3,
              dataType: 'datetime'
            },
            {
              id: 'kubernetes_observed_generation',
              label: 'Observed gen.',
              value: 22,
              priority: 4,
              dataType: 'number'
            },
            {
              id: 'kubernetes_desired_replicas',
              label: 'Desired replicas',
              value: 1,
              priority: 5,
              dataType: 'number'
            },
            {
              id: 'pod',
              label: '# Pods',
              value: 1,
              priority: 6,
              dataType: 'number'
            },
            {
              id: 'kubernetes_strategy',
              label: 'Strategy',
              value: 'Recreate',
              priority: 7
            }
          ],
          metrics: [
            {
              id: 'docker_cpu_total_usage',
              label: 'CPU',
              format: 'percent',
              value: 0,
              priority: 1,
              samples: null,
              min: 0,
              max: 100,
              url: 0
            },
            {
              id: 'docker_memory_usage',
              label: 'Memory',
              format: 'filesize',
              value: 178925568,
              priority: 2,
              samples: null,
              min: 177053696,
              max: 4138717184,
              url: 0
            }
          ],
          tables: [
            {
              id: 'kubernetes_labels_',
              label: 'Kubernetes labels',
              type: 'property-list',
              columns: null,
              rows: [
                {
                  id: 'label_k8s-app',
                  entries: {
                    label: 'k8s-app',
                    value: 'inaregames-com-bots'
                  }
                }
              ]
            }
          ],
          adjacency: [
            'out-theinternet'
          ]
        },
        '6cb6d43e-596a-11e9-80d7-ce3760099703;\\u003cdeployment\\u003e': {
          id: '6cb6d43e-596a-11e9-80d7-ce3760099703;\\u003cdeployment\\u003e',
          label: 'inaregames-com-app',
          labelMinor: 'Deployment of 1 pod',
          rank: 'inaregames-com/inaregames-com-app',
          shape: 'heptagon',
          stack: true,
          metadata: [
            {
              id: 'kubernetes_node_type',
              label: 'Type',
              value: 'Deployment',
              priority: 1
            },
            {
              id: 'kubernetes_namespace',
              label: 'Namespace',
              value: 'inaregames-com',
              priority: 2
            },
            {
              id: 'kubernetes_created',
              label: 'Created',
              value: '2019-04-07T19:22:03Z',
              priority: 3,
              dataType: 'datetime'
            },
            {
              id: 'kubernetes_observed_generation',
              label: 'Observed gen.',
              value: 27,
              priority: 4,
              dataType: 'number'
            },
            {
              id: 'kubernetes_desired_replicas',
              label: 'Desired replicas',
              value: 1,
              priority: 5,
              dataType: 'number'
            },
            {
              id: 'pod',
              label: '# Pods',
              value: 1,
              priority: 6,
              dataType: 'number'
            },
            {
              id: 'kubernetes_strategy',
              label: 'Strategy',
              value: 'Recreate',
              priority: 7
            }
          ],
          metrics: [
            {
              id: 'docker_cpu_total_usage',
              label: 'CPU',
              format: 'percent',
              value: 0,
              priority: 1,
              samples: null,
              min: 0.005875480769230769,
              max: 100,
              url: 0
            },
            {
              id: 'docker_memory_usage',
              label: 'Memory',
              format: 'filesize',
              value: 116957184,
              priority: 2,
              samples: null,
              min: 116957184,
              max: 4138717184,
              url: 0
            }
          ],
          tables: [
            {
              id: 'kubernetes_labels_',
              label: 'Kubernetes labels',
              type: 'property-list',
              columns: null,
              rows: [
                {
                  id: 'label_k8s-app',
                  entries: {
                    label: 'k8s-app',
                    value: 'inaregames-com-app'
                  }
                }
              ]
            }
          ],
          adjacency: [
            '6949e8dd-589e-11e9-80d7-ce3760099703;\\u003cstatefulset\\u003e',
            '85484208-58a3-11e9-80d7-ce3760099703;\\u003cdeployment\\u003e'
          ]
        },
        'c2a708e1-5885-11e9-80d7-ce3760099703;\\u003cdaemonset\\u003e': {
          id: 'c2a708e1-5885-11e9-80d7-ce3760099703;\\u003cdaemonset\\u003e',
          label: 'kube-proxy',
          labelMinor: 'DaemonSet of 2 pods',
          rank: 'kube-system/kube-proxy',
          shape: 'pentagon',
          stack: true,
          metadata: [
            {
              id: 'kubernetes_node_type',
              label: 'Type',
              value: 'DaemonSet',
              priority: 1
            },
            {
              id: 'kubernetes_namespace',
              label: 'Namespace',
              value: 'kube-system',
              priority: 2
            },
            {
              id: 'kubernetes_created',
              label: 'Created',
              value: '2019-04-06T16:05:13Z',
              priority: 3,
              dataType: 'datetime'
            },
            {
              id: 'kubernetes_desired_replicas',
              label: 'Desired replicas',
              value: 2,
              priority: 4,
              dataType: 'number'
            },
            {
              id: 'pod',
              label: '# Pods',
              value: 2,
              priority: 5,
              dataType: 'number'
            }
          ],
          tables: [
            {
              id: 'kubernetes_labels_',
              label: 'Kubernetes labels',
              type: 'property-list',
              columns: null,
              rows: [
                {
                  id: 'label_k8s-app',
                  entries: {
                    label: 'k8s-app',
                    value: 'kube-proxy'
                  }
                },
                {
                  id: 'label_tier',
                  entries: {
                    label: 'tier',
                    value: 'node'
                  }
                }
              ]
            }
          ]
        },
        'c356afb6-5885-11e9-80d7-ce3760099703;\\u003cdaemonset\\u003e': {
          id: 'c356afb6-5885-11e9-80d7-ce3760099703;\\u003cdaemonset\\u003e',
          label: 'csi-do-node',
          labelMinor: 'DaemonSet of 2 pods',
          rank: 'kube-system/csi-do-node',
          shape: 'pentagon',
          stack: true,
          metadata: [
            {
              id: 'kubernetes_node_type',
              label: 'Type',
              value: 'DaemonSet',
              priority: 1
            },
            {
              id: 'kubernetes_namespace',
              label: 'Namespace',
              value: 'kube-system',
              priority: 2
            },
            {
              id: 'kubernetes_created',
              label: 'Created',
              value: '2019-04-06T16:05:14Z',
              priority: 3,
              dataType: 'datetime'
            },
            {
              id: 'kubernetes_desired_replicas',
              label: 'Desired replicas',
              value: 2,
              priority: 4,
              dataType: 'number'
            },
            {
              id: 'pod',
              label: '# Pods',
              value: 2,
              priority: 5,
              dataType: 'number'
            }
          ],
          tables: [
            {
              id: 'kubernetes_labels_',
              label: 'Kubernetes labels',
              type: 'property-list',
              columns: null,
              rows: []
            }
          ]
        },
        '85484208-58a3-11e9-80d7-ce3760099703;\\u003cdeployment\\u003e': {
          id: '85484208-58a3-11e9-80d7-ce3760099703;\\u003cdeployment\\u003e',
          label: 'mysql',
          labelMinor: 'Deployment of 1 pod',
          rank: 'inaregames-com/mysql',
          shape: 'heptagon',
          stack: true,
          metadata: [
            {
              id: 'kubernetes_node_type',
              label: 'Type',
              value: 'Deployment',
              priority: 1
            },
            {
              id: 'kubernetes_namespace',
              label: 'Namespace',
              value: 'inaregames-com',
              priority: 2
            },
            {
              id: 'kubernetes_created',
              label: 'Created',
              value: '2019-04-06T19:38:15Z',
              priority: 3,
              dataType: 'datetime'
            },
            {
              id: 'kubernetes_observed_generation',
              label: 'Observed gen.',
              value: 3,
              priority: 4,
              dataType: 'number'
            },
            {
              id: 'kubernetes_desired_replicas',
              label: 'Desired replicas',
              value: 1,
              priority: 5,
              dataType: 'number'
            },
            {
              id: 'pod',
              label: '# Pods',
              value: 1,
              priority: 6,
              dataType: 'number'
            },
            {
              id: 'kubernetes_strategy',
              label: 'Strategy',
              value: 'Recreate',
              priority: 7
            }
          ],
          metrics: [
            {
              id: 'docker_cpu_total_usage',
              label: 'CPU',
              format: 'percent',
              value: 0.24,
              priority: 1,
              samples: null,
              min: 0.2456988118811881,
              max: 100,
              url: 0
            },
            {
              id: 'docker_memory_usage',
              label: 'Memory',
              format: 'filesize',
              value: 1034223616,
              priority: 2,
              samples: null,
              min: 1034223616,
              max: 4138700800,
              url: 0
            }
          ],
          tables: [
            {
              id: 'kubernetes_labels_',
              label: 'Kubernetes labels',
              type: 'property-list',
              columns: null,
              rows: [
                {
                  id: 'label_k8s-app',
                  entries: {
                    value: 'mysql',
                    label: 'k8s-app'
                  }
                }
              ]
            }
          ],
          adjacency: [
            'pseudo:unmanaged:'
          ]
        },
        'f05edad2-5aad-11e9-80d7-ce3760099703;\\u003cdeployment\\u003e': {
          id: 'f05edad2-5aad-11e9-80d7-ce3760099703;\\u003cdeployment\\u003e',
          label: 'wikijs',
          labelMinor: 'Deployment of 1 pod',
          rank: 'wiki/wikijs',
          shape: 'heptagon',
          stack: true,
          metadata: [
            {
              id: 'kubernetes_node_type',
              label: 'Type',
              value: 'Deployment',
              priority: 1
            },
            {
              id: 'kubernetes_namespace',
              label: 'Namespace',
              value: 'wiki',
              priority: 2
            },
            {
              id: 'kubernetes_created',
              label: 'Created',
              value: '2019-04-09T09:57:52Z',
              priority: 3,
              dataType: 'datetime'
            },
            {
              id: 'kubernetes_observed_generation',
              label: 'Observed gen.',
              value: 5,
              priority: 4,
              dataType: 'number'
            },
            {
              id: 'kubernetes_desired_replicas',
              label: 'Desired replicas',
              value: 1,
              priority: 5,
              dataType: 'number'
            },
            {
              id: 'pod',
              label: '# Pods',
              value: 1,
              priority: 6,
              dataType: 'number'
            },
            {
              id: 'kubernetes_strategy',
              label: 'Strategy',
              value: 'RollingUpdate',
              priority: 7
            }
          ],
          metrics: [
            {
              id: 'docker_cpu_total_usage',
              label: 'CPU',
              format: 'percent',
              value: 0.01,
              priority: 1,
              samples: null,
              min: 0.003160132158590309,
              max: 100,
              url: 0
            },
            {
              id: 'docker_memory_usage',
              label: 'Memory',
              format: 'filesize',
              value: 88518656,
              priority: 2,
              samples: null,
              min: 88518656,
              max: 4138717184,
              url: 0
            }
          ],
          tables: [
            {
              id: 'kubernetes_labels_',
              label: 'Kubernetes labels',
              type: 'property-list',
              columns: null,
              rows: [
                {
                  id: 'label_app',
                  entries: {
                    label: 'app',
                    value: 'wikijs'
                  }
                }
              ]
            }
          ],
          adjacency: [
            '3ff724f9-5aab-11e9-80d7-ce3760099703;\\u003cdeployment\\u003e'
          ]
        },
        '09c51a6f-5894-11e9-80d7-ce3760099703;\\u003cdaemonset\\u003e': {
          id: '09c51a6f-5894-11e9-80d7-ce3760099703;\\u003cdaemonset\\u003e',
          label: 'weavescope-traffic-control-plugin',
          labelMinor: 'DaemonSet of 2 pods',
          rank: 'default/weavescope-traffic-control-plugin',
          shape: 'pentagon',
          stack: true,
          metadata: [
            {
              id: 'kubernetes_node_type',
              label: 'Type',
              value: 'DaemonSet',
              priority: 1
            },
            {
              id: 'kubernetes_namespace',
              label: 'Namespace',
              value: 'default',
              priority: 2
            },
            {
              id: 'kubernetes_created',
              label: 'Created',
              value: '2019-04-06T17:47:25Z',
              priority: 3,
              dataType: 'datetime'
            },
            {
              id: 'kubernetes_desired_replicas',
              label: 'Desired replicas',
              value: 2,
              priority: 4,
              dataType: 'number'
            },
            {
              id: 'pod',
              label: '# Pods',
              value: 2,
              priority: 5,
              dataType: 'number'
            }
          ],
          tables: [
            {
              id: 'kubernetes_labels_',
              label: 'Kubernetes labels',
              type: 'property-list',
              columns: null,
              rows: [
                {
                  id: 'label_app',
                  entries: {
                    label: 'app',
                    value: 'weavescope'
                  }
                },
                {
                  id: 'label_weavescope-component',
                  entries: {
                    label: 'weavescope-component',
                    value: 'weavescope-traffic-control-plugin'
                  }
                }
              ]
            }
          ]
        },
        'f1e67370-5d77-11e9-80d7-ce3760099703;\\u003cdaemonset\\u003e': {
          id: 'f1e67370-5d77-11e9-80d7-ce3760099703;\\u003cdaemonset\\u003e',
          label: 'netdata-slave',
          labelMinor: 'DaemonSet of 2 pods',
          rank: 'monitoring/netdata-slave',
          shape: 'pentagon',
          stack: true,
          metadata: [
            {
              id: 'kubernetes_node_type',
              label: 'Type',
              value: 'DaemonSet',
              priority: 1
            },
            {
              id: 'kubernetes_namespace',
              label: 'Namespace',
              value: 'monitoring',
              priority: 2
            },
            {
              id: 'kubernetes_created',
              label: 'Created',
              value: '2019-04-12T23:08:55Z',
              priority: 3,
              dataType: 'datetime'
            },
            {
              id: 'kubernetes_desired_replicas',
              label: 'Desired replicas',
              value: 2,
              priority: 4,
              dataType: 'number'
            },
            {
              id: 'pod',
              label: '# Pods',
              value: 2,
              priority: 5,
              dataType: 'number'
            }
          ],
          tables: [
            {
              id: 'kubernetes_labels_',
              label: 'Kubernetes labels',
              type: 'property-list',
              columns: null,
              rows: [
                {
                  id: 'label_app',
                  entries: {
                    label: 'app',
                    value: 'netdata'
                  }
                },
                {
                  id: 'label_chart',
                  entries: {
                    label: 'chart',
                    value: 'netdata-0.0.9'
                  }
                },
                {
                  id: 'label_heritage',
                  entries: {
                    label: 'heritage',
                    value: 'Tiller'
                  }
                },
                {
                  id: 'label_release',
                  entries: {
                    label: 'release',
                    value: 'netdata'
                  }
                },
                {
                  id: 'label_role',
                  entries: {
                    label: 'role',
                    value: 'slave'
                  }
                }
              ]
            }
          ],
          adjacency: [
            'f1e88162-5d77-11e9-80d7-ce3760099703;\\u003cstatefulset\\u003e'
          ]
        },
        '28aaf263-5894-11e9-80d7-ce3760099703;\\u003cdaemonset\\u003e': {
          id: '28aaf263-5894-11e9-80d7-ce3760099703;\\u003cdaemonset\\u003e',
          label: 'weavescope-iowait-plugin',
          labelMinor: 'DaemonSet of 2 pods',
          rank: 'default/weavescope-iowait-plugin',
          shape: 'pentagon',
          stack: true,
          metadata: [
            {
              id: 'kubernetes_node_type',
              label: 'Type',
              value: 'DaemonSet',
              priority: 1
            },
            {
              id: 'kubernetes_namespace',
              label: 'Namespace',
              value: 'default',
              priority: 2
            },
            {
              id: 'kubernetes_created',
              label: 'Created',
              value: '2019-04-06T17:48:17Z',
              priority: 3,
              dataType: 'datetime'
            },
            {
              id: 'kubernetes_desired_replicas',
              label: 'Desired replicas',
              value: 2,
              priority: 4,
              dataType: 'number'
            },
            {
              id: 'pod',
              label: '# Pods',
              value: 2,
              priority: 5,
              dataType: 'number'
            }
          ],
          tables: [
            {
              id: 'kubernetes_labels_',
              label: 'Kubernetes labels',
              type: 'property-list',
              columns: null,
              rows: [
                {
                  id: 'label_app',
                  entries: {
                    label: 'app',
                    value: 'weavescope'
                  }
                },
                {
                  id: 'label_weavescope-component',
                  entries: {
                    label: 'weavescope-component',
                    value: 'weavescope-iowait-plugin'
                  }
                }
              ]
            }
          ]
        },
        '635d3a9c-588a-11e9-80d7-ce3760099703;\\u003cdeployment\\u003e': {
          id: '635d3a9c-588a-11e9-80d7-ce3760099703;\\u003cdeployment\\u003e',
          label: 'kubernetes-dashboard',
          labelMinor: 'Deployment of 1 pod',
          rank: 'kube-system/kubernetes-dashboard',
          shape: 'heptagon',
          stack: true,
          metadata: [
            {
              id: 'kubernetes_node_type',
              label: 'Type',
              value: 'Deployment',
              priority: 1
            },
            {
              id: 'kubernetes_namespace',
              label: 'Namespace',
              value: 'kube-system',
              priority: 2
            },
            {
              id: 'kubernetes_created',
              label: 'Created',
              value: '2019-04-06T16:38:20Z',
              priority: 3,
              dataType: 'datetime'
            },
            {
              id: 'kubernetes_observed_generation',
              label: 'Observed gen.',
              value: 1,
              priority: 4,
              dataType: 'number'
            },
            {
              id: 'kubernetes_desired_replicas',
              label: 'Desired replicas',
              value: 1,
              priority: 5,
              dataType: 'number'
            },
            {
              id: 'pod',
              label: '# Pods',
              value: 1,
              priority: 6,
              dataType: 'number'
            },
            {
              id: 'kubernetes_strategy',
              label: 'Strategy',
              value: 'RollingUpdate',
              priority: 7
            }
          ],
          metrics: [
            {
              id: 'docker_cpu_total_usage',
              label: 'CPU',
              format: 'percent',
              value: 0.1,
              priority: 1,
              samples: null,
              min: 0,
              max: 100,
              url: 0
            },
            {
              id: 'docker_memory_usage',
              label: 'Memory',
              format: 'filesize',
              value: 21266432,
              priority: 2,
              samples: null,
              min: 21266432,
              max: 4138717184,
              url: 0
            }
          ],
          tables: [
            {
              id: 'kubernetes_labels_',
              label: 'Kubernetes labels',
              type: 'property-list',
              columns: null,
              rows: [
                {
                  id: 'label_k8s-app',
                  entries: {
                    label: 'k8s-app',
                    value: 'kubernetes-dashboard'
                  }
                }
              ]
            }
          ]
        },
        'a0e255ed-5a2c-11e9-80d7-ce3760099703;\\u003cdeployment\\u003e': {
          id: 'a0e255ed-5a2c-11e9-80d7-ce3760099703;\\u003cdeployment\\u003e',
          label: 'inaregames-com-cron',
          labelMinor: 'Deployment of 1 pod',
          rank: 'inaregames-com/inaregames-com-cron',
          shape: 'heptagon',
          stack: true,
          metadata: [
            {
              id: 'kubernetes_node_type',
              label: 'Type',
              value: 'Deployment',
              priority: 1
            },
            {
              id: 'kubernetes_namespace',
              label: 'Namespace',
              value: 'inaregames-com',
              priority: 2
            },
            {
              id: 'kubernetes_created',
              label: 'Created',
              value: '2019-04-08T18:32:13Z',
              priority: 3,
              dataType: 'datetime'
            },
            {
              id: 'kubernetes_observed_generation',
              label: 'Observed gen.',
              value: 19,
              priority: 4,
              dataType: 'number'
            },
            {
              id: 'kubernetes_desired_replicas',
              label: 'Desired replicas',
              value: 1,
              priority: 5,
              dataType: 'number'
            },
            {
              id: 'pod',
              label: '# Pods',
              value: 1,
              priority: 6,
              dataType: 'number'
            },
            {
              id: 'kubernetes_strategy',
              label: 'Strategy',
              value: 'Recreate',
              priority: 7
            }
          ],
          metrics: [
            {
              id: 'docker_cpu_total_usage',
              label: 'CPU',
              format: 'percent',
              value: 0,
              priority: 1,
              samples: null,
              min: 0,
              max: 100,
              url: 0
            },
            {
              id: 'docker_memory_usage',
              label: 'Memory',
              format: 'filesize',
              value: 88268800,
              priority: 2,
              samples: null,
              min: 87994368,
              max: 4138717184,
              url: 0
            }
          ],
          tables: [
            {
              id: 'kubernetes_labels_',
              label: 'Kubernetes labels',
              type: 'property-list',
              columns: null,
              rows: [
                {
                  id: 'label_k8s-app',
                  entries: {
                    label: 'k8s-app',
                    value: 'inaregames-com-cron'
                  }
                }
              ]
            }
          ],
          adjacency: [
            '6949e8dd-589e-11e9-80d7-ce3760099703;\\u003cstatefulset\\u003e',
            '85484208-58a3-11e9-80d7-ce3760099703;\\u003cdeployment\\u003e'
          ]
        },
        'c2f6257c-5885-11e9-80d7-ce3760099703;\\u003cdeployment\\u003e': {
          id: 'c2f6257c-5885-11e9-80d7-ce3760099703;\\u003cdeployment\\u003e',
          label: 'coredns',
          labelMinor: 'Deployment of 2 pods',
          rank: 'kube-system/coredns',
          shape: 'heptagon',
          stack: true,
          metadata: [
            {
              id: 'kubernetes_node_type',
              label: 'Type',
              value: 'Deployment',
              priority: 1
            },
            {
              id: 'kubernetes_namespace',
              label: 'Namespace',
              value: 'kube-system',
              priority: 2
            },
            {
              id: 'kubernetes_created',
              label: 'Created',
              value: '2019-04-06T16:05:13Z',
              priority: 3,
              dataType: 'datetime'
            },
            {
              id: 'kubernetes_observed_generation',
              label: 'Observed gen.',
              value: 1,
              priority: 4,
              dataType: 'number'
            },
            {
              id: 'kubernetes_desired_replicas',
              label: 'Desired replicas',
              value: 2,
              priority: 5,
              dataType: 'number'
            },
            {
              id: 'pod',
              label: '# Pods',
              value: 2,
              priority: 6,
              dataType: 'number'
            },
            {
              id: 'kubernetes_strategy',
              label: 'Strategy',
              value: 'RollingUpdate',
              priority: 7
            }
          ],
          tables: [
            {
              id: 'kubernetes_labels_',
              label: 'Kubernetes labels',
              type: 'property-list',
              columns: null,
              rows: [
                {
                  id: 'label_k8s-app',
                  entries: {
                    label: 'k8s-app',
                    value: 'kube-dns'
                  }
                },
                {
                  id: 'label_kubernetes.io/name',
                  entries: {
                    label: 'kubernetes.io/name',
                    value: 'CoreDNS'
                  }
                }
              ]
            }
          ]
        },
        'c37ecdd1-5885-11e9-80d7-ce3760099703;\\u003cdaemonset\\u003e': {
          id: 'c37ecdd1-5885-11e9-80d7-ce3760099703;\\u003cdaemonset\\u003e',
          label: 'do-node-agent',
          labelMinor: 'DaemonSet of 2 pods',
          rank: 'kube-system/do-node-agent',
          shape: 'pentagon',
          stack: true,
          metadata: [
            {
              id: 'kubernetes_node_type',
              label: 'Type',
              value: 'DaemonSet',
              priority: 1
            },
            {
              id: 'kubernetes_namespace',
              label: 'Namespace',
              value: 'kube-system',
              priority: 2
            },
            {
              id: 'kubernetes_created',
              label: 'Created',
              value: '2019-04-06T16:05:14Z',
              priority: 3,
              dataType: 'datetime'
            },
            {
              id: 'kubernetes_desired_replicas',
              label: 'Desired replicas',
              value: 2,
              priority: 4,
              dataType: 'number'
            },
            {
              id: 'pod',
              label: '# Pods',
              value: 2,
              priority: 5,
              dataType: 'number'
            }
          ],
          tables: [
            {
              id: 'kubernetes_labels_',
              label: 'Kubernetes labels',
              type: 'property-list',
              columns: null,
              rows: [
                {
                  id: 'label_app',
                  entries: {
                    label: 'app',
                    value: 'do-node-agent'
                  }
                }
              ]
            }
          ]
        },
        '3027a4ec-5893-11e9-80d7-ce3760099703;\\u003cdaemonset\\u003e': {
          id: '3027a4ec-5893-11e9-80d7-ce3760099703;\\u003cdaemonset\\u003e',
          label: 'weave-scope-agent',
          labelMinor: 'DaemonSet of 2 pods',
          rank: 'weave/weave-scope-agent',
          shape: 'pentagon',
          stack: true,
          metadata: [
            {
              id: 'kubernetes_node_type',
              label: 'Type',
              value: 'DaemonSet',
              priority: 1
            },
            {
              id: 'kubernetes_namespace',
              label: 'Namespace',
              value: 'weave',
              priority: 2
            },
            {
              id: 'kubernetes_created',
              label: 'Created',
              value: '2019-04-06T17:41:20Z',
              priority: 3,
              dataType: 'datetime'
            },
            {
              id: 'kubernetes_desired_replicas',
              label: 'Desired replicas',
              value: 2,
              priority: 4,
              dataType: 'number'
            },
            {
              id: 'pod',
              label: '# Pods',
              value: 2,
              priority: 5,
              dataType: 'number'
            }
          ],
          tables: [
            {
              id: 'kubernetes_labels_',
              label: 'Kubernetes labels',
              type: 'property-list',
              columns: null,
              rows: [
                {
                  id: 'label_app',
                  entries: {
                    label: 'app',
                    value: 'weave-scope'
                  }
                },
                {
                  id: 'label_name',
                  entries: {
                    label: 'name',
                    value: 'weave-scope-agent'
                  }
                },
                {
                  id: 'label_weave-cloud-component',
                  entries: {
                    label: 'weave-cloud-component',
                    value: 'scope'
                  }
                },
                {
                  id: 'label_weave-scope-component',
                  entries: {
                    label: 'weave-scope-component',
                    value: 'agent'
                  }
                }
              ]
            }
          ],
          adjacency: [
            '2ff26e19-5893-11e9-80d7-ce3760099703;\\u003cdeployment\\u003e'
          ]
        },
        'efb74121-5896-11e9-80d7-ce3760099703;\\u003cdeployment\\u003e': {
          id: 'efb74121-5896-11e9-80d7-ce3760099703;\\u003cdeployment\\u003e',
          label: 'tiller-deploy',
          labelMinor: 'Deployment of 1 pod',
          rank: 'kube-system/tiller-deploy',
          shape: 'heptagon',
          stack: true,
          metadata: [
            {
              id: 'kubernetes_node_type',
              label: 'Type',
              value: 'Deployment',
              priority: 1
            },
            {
              id: 'kubernetes_namespace',
              label: 'Namespace',
              value: 'kube-system',
              priority: 2
            },
            {
              id: 'kubernetes_created',
              label: 'Created',
              value: '2019-04-06T18:08:10Z',
              priority: 3,
              dataType: 'datetime'
            },
            {
              id: 'kubernetes_observed_generation',
              label: 'Observed gen.',
              value: 2,
              priority: 4,
              dataType: 'number'
            },
            {
              id: 'kubernetes_desired_replicas',
              label: 'Desired replicas',
              value: 1,
              priority: 5,
              dataType: 'number'
            },
            {
              id: 'pod',
              label: '# Pods',
              value: 1,
              priority: 6,
              dataType: 'number'
            },
            {
              id: 'kubernetes_strategy',
              label: 'Strategy',
              value: 'RollingUpdate',
              priority: 7
            }
          ],
          metrics: [
            {
              id: 'docker_cpu_total_usage',
              label: 'CPU',
              format: 'percent',
              value: 0,
              priority: 1,
              samples: null,
              min: 0,
              max: 100,
              url: 0
            },
            {
              id: 'docker_memory_usage',
              label: 'Memory',
              format: 'filesize',
              value: 7077888,
              priority: 2,
              samples: null,
              min: 7077888,
              max: 4138700800,
              url: 0
            }
          ],
          tables: [
            {
              id: 'kubernetes_labels_',
              label: 'Kubernetes labels',
              type: 'property-list',
              columns: null,
              rows: [
                {
                  id: 'label_app',
                  entries: {
                    label: 'app',
                    value: 'helm'
                  }
                },
                {
                  id: 'label_name',
                  entries: {
                    label: 'name',
                    value: 'tiller'
                  }
                }
              ]
            }
          ]
        },
        '3015b274-5893-11e9-80d7-ce3760099703;\\u003cdeployment\\u003e': {
          id: '3015b274-5893-11e9-80d7-ce3760099703;\\u003cdeployment\\u003e',
          label: 'weave-scope-cluster-agent',
          labelMinor: 'Deployment of 1 pod',
          rank: 'weave/weave-scope-cluster-agent',
          shape: 'heptagon',
          stack: true,
          metadata: [
            {
              id: 'kubernetes_node_type',
              label: 'Type',
              value: 'Deployment',
              priority: 1
            },
            {
              id: 'kubernetes_namespace',
              label: 'Namespace',
              value: 'weave',
              priority: 2
            },
            {
              id: 'kubernetes_created',
              label: 'Created',
              value: '2019-04-06T17:41:20Z',
              priority: 3,
              dataType: 'datetime'
            },
            {
              id: 'kubernetes_observed_generation',
              label: 'Observed gen.',
              value: 1,
              priority: 4,
              dataType: 'number'
            },
            {
              id: 'kubernetes_desired_replicas',
              label: 'Desired replicas',
              value: 1,
              priority: 5,
              dataType: 'number'
            },
            {
              id: 'pod',
              label: '# Pods',
              value: 1,
              priority: 6,
              dataType: 'number'
            },
            {
              id: 'kubernetes_strategy',
              label: 'Strategy',
              value: 'RollingUpdate',
              priority: 7
            }
          ],
          metrics: [
            {
              id: 'docker_cpu_total_usage',
              label: 'CPU',
              format: 'percent',
              value: 0.23,
              priority: 1,
              samples: null,
              min: 0.13722337962962963,
              max: 100,
              url: 0
            },
            {
              id: 'docker_memory_usage',
              label: 'Memory',
              format: 'filesize',
              value: 65986560,
              priority: 2,
              samples: null,
              min: 65986560,
              max: 4138717184,
              url: 0
            }
          ],
          tables: [
            {
              id: 'kubernetes_labels_',
              label: 'Kubernetes labels',
              type: 'property-list',
              columns: null,
              rows: [
                {
                  id: 'label_app',
                  entries: {
                    label: 'app',
                    value: 'weave-scope'
                  }
                },
                {
                  id: 'label_name',
                  entries: {
                    label: 'name',
                    value: 'weave-scope-cluster-agent'
                  }
                },
                {
                  id: 'label_weave-cloud-component',
                  entries: {
                    label: 'weave-cloud-component',
                    value: 'scope'
                  }
                },
                {
                  id: 'label_weave-scope-component',
                  entries: {
                    label: 'weave-scope-component',
                    value: 'cluster-agent'
                  }
                }
              ]
            }
          ],
          adjacency: [
            '2ff26e19-5893-11e9-80d7-ce3760099703;\\u003cdeployment\\u003e'
          ]
        },
        'out-theinternet': {
          id: 'out-theinternet',
          label: 'The Internet',
          labelMinor: 'Outbound connections',
          rank: 'out-theinternet',
          shape: 'cloud',
          pseudo: true
        },
        'f1e88162-5d77-11e9-80d7-ce3760099703;\\u003cstatefulset\\u003e': {
          id: 'f1e88162-5d77-11e9-80d7-ce3760099703;\\u003cstatefulset\\u003e',
          label: 'netdata-master',
          labelMinor: 'StatefulSet of 1 pod',
          rank: 'monitoring/netdata-master',
          shape: 'octagon',
          stack: true,
          metadata: [
            {
              id: 'kubernetes_node_type',
              label: 'Type',
              value: 'StatefulSet',
              priority: 1
            },
            {
              id: 'kubernetes_namespace',
              label: 'Namespace',
              value: 'monitoring',
              priority: 2
            },
            {
              id: 'kubernetes_created',
              label: 'Created',
              value: '2019-04-12T23:08:55Z',
              priority: 3,
              dataType: 'datetime'
            },
            {
              id: 'kubernetes_observed_generation',
              label: 'Observed gen.',
              value: 1,
              priority: 4,
              dataType: 'number'
            },
            {
              id: 'kubernetes_desired_replicas',
              label: 'Desired replicas',
              value: 1,
              priority: 5,
              dataType: 'number'
            },
            {
              id: 'pod',
              label: '# Pods',
              value: 1,
              priority: 6,
              dataType: 'number'
            }
          ],
          metrics: [
            {
              id: 'docker_cpu_total_usage',
              label: 'CPU',
              format: 'percent',
              value: 0.7,
              priority: 1,
              samples: null,
              min: 0.6150666666666667,
              max: 100,
              url: 0
            },
            {
              id: 'docker_memory_usage',
              label: 'Memory',
              format: 'filesize',
              value: 136962048,
              priority: 2,
              samples: null,
              min: 136962048,
              max: 4138700800,
              url: 0
            }
          ],
          tables: [
            {
              id: 'kubernetes_labels_',
              label: 'Kubernetes labels',
              type: 'property-list',
              columns: null,
              rows: [
                {
                  id: 'label_app',
                  entries: {
                    label: 'app',
                    value: 'netdata'
                  }
                },
                {
                  id: 'label_chart',
                  entries: {
                    label: 'chart',
                    value: 'netdata-0.0.9'
                  }
                },
                {
                  id: 'label_heritage',
                  entries: {
                    label: 'heritage',
                    value: 'Tiller'
                  }
                },
                {
                  id: 'label_release',
                  entries: {
                    value: 'netdata',
                    label: 'release'
                  }
                },
                {
                  id: 'label_role',
                  entries: {
                    value: 'master',
                    label: 'role'
                  }
                }
              ]
            }
          ],
          adjacency: [
            'pseudo:unmanaged:'
          ]
        },
        '3ff724f9-5aab-11e9-80d7-ce3760099703;\\u003cdeployment\\u003e': {
          id: '3ff724f9-5aab-11e9-80d7-ce3760099703;\\u003cdeployment\\u003e',
          label: 'postgres',
          labelMinor: 'Deployment of 1 pod',
          rank: 'wiki/postgres',
          shape: 'heptagon',
          stack: true,
          metadata: [
            {
              id: 'kubernetes_node_type',
              label: 'Type',
              value: 'Deployment',
              priority: 1
            },
            {
              id: 'kubernetes_namespace',
              label: 'Namespace',
              value: 'wiki',
              priority: 2
            },
            {
              id: 'kubernetes_created',
              label: 'Created',
              value: '2019-04-09T09:38:37Z',
              priority: 3,
              dataType: 'datetime'
            },
            {
              id: 'kubernetes_observed_generation',
              label: 'Observed gen.',
              value: 1,
              priority: 4,
              dataType: 'number'
            },
            {
              id: 'kubernetes_desired_replicas',
              label: 'Desired replicas',
              value: 1,
              priority: 5,
              dataType: 'number'
            },
            {
              id: 'pod',
              label: '# Pods',
              value: 1,
              priority: 6,
              dataType: 'number'
            },
            {
              id: 'kubernetes_strategy',
              label: 'Strategy',
              value: 'RollingUpdate',
              priority: 7
            }
          ],
          metrics: [
            {
              id: 'docker_cpu_total_usage',
              label: 'CPU',
              format: 'percent',
              value: 0,
              priority: 1,
              samples: null,
              min: 0,
              max: 100,
              url: 0
            },
            {
              id: 'docker_memory_usage',
              label: 'Memory',
              format: 'filesize',
              value: 8216576,
              priority: 2,
              samples: null,
              min: 8216576,
              max: 4138717184,
              url: 0
            }
          ],
          tables: [
            {
              id: 'kubernetes_labels_',
              label: 'Kubernetes labels',
              type: 'property-list',
              columns: null,
              rows: [
                {
                  id: 'label_app',
                  entries: {
                    label: 'app',
                    value: 'postgres'
                  }
                }
              ]
            }
          ],
          adjacency: [
            'pseudo:unmanaged:'
          ]
        },
        'c2c36a8d-5885-11e9-80d7-ce3760099703;\\u003cdaemonset\\u003e': {
          id: 'c2c36a8d-5885-11e9-80d7-ce3760099703;\\u003cdaemonset\\u003e',
          label: 'cilium',
          labelMinor: 'DaemonSet of 2 pods',
          rank: 'kube-system/cilium',
          shape: 'pentagon',
          stack: true,
          metadata: [
            {
              id: 'kubernetes_node_type',
              label: 'Type',
              value: 'DaemonSet',
              priority: 1
            },
            {
              id: 'kubernetes_namespace',
              label: 'Namespace',
              value: 'kube-system',
              priority: 2
            },
            {
              id: 'kubernetes_created',
              label: 'Created',
              value: '2019-04-06T16:05:13Z',
              priority: 3,
              dataType: 'datetime'
            },
            {
              id: 'kubernetes_desired_replicas',
              label: 'Desired replicas',
              value: 2,
              priority: 4,
              dataType: 'number'
            },
            {
              id: 'pod',
              label: '# Pods',
              value: 2,
              priority: 5,
              dataType: 'number'
            }
          ],
          tables: [
            {
              id: 'kubernetes_labels_',
              label: 'Kubernetes labels',
              type: 'property-list',
              columns: null,
              rows: [
                {
                  id: 'label_k8s-app',
                  entries: {
                    label: 'k8s-app',
                    value: 'cilium'
                  }
                },
                {
                  id: 'label_kubernetes.io/cluster-service',
                  entries: {
                    label: 'kubernetes.io/cluster-service',
                    value: 'true'
                  }
                }
              ]
            }
          ]
        },
        'c2c606ac-5885-11e9-80d7-ce3760099703;\\u003cdeployment\\u003e': {
          id: 'c2c606ac-5885-11e9-80d7-ce3760099703;\\u003cdeployment\\u003e',
          label: 'cilium-operator',
          labelMinor: 'Deployment of 1 pod',
          rank: 'kube-system/cilium-operator',
          shape: 'heptagon',
          stack: true,
          metadata: [
            {
              id: 'kubernetes_node_type',
              label: 'Type',
              value: 'Deployment',
              priority: 1
            },
            {
              id: 'kubernetes_namespace',
              label: 'Namespace',
              value: 'kube-system',
              priority: 2
            },
            {
              id: 'kubernetes_created',
              label: 'Created',
              value: '2019-04-06T16:05:13Z',
              priority: 3,
              dataType: 'datetime'
            },
            {
              id: 'kubernetes_observed_generation',
              label: 'Observed gen.',
              value: 1,
              priority: 4,
              dataType: 'number'
            },
            {
              id: 'kubernetes_desired_replicas',
              label: 'Desired replicas',
              value: 1,
              priority: 5,
              dataType: 'number'
            },
            {
              id: 'pod',
              label: '# Pods',
              value: 1,
              priority: 6,
              dataType: 'number'
            },
            {
              id: 'kubernetes_strategy',
              label: 'Strategy',
              value: 'RollingUpdate',
              priority: 7
            }
          ],
          metrics: [
            {
              id: 'docker_cpu_total_usage',
              label: 'CPU',
              format: 'percent',
              value: 0.03,
              priority: 1,
              samples: null,
              min: 0.02897004651162791,
              max: 100,
              url: 0
            },
            {
              id: 'docker_memory_usage',
              label: 'Memory',
              format: 'filesize',
              value: 32288768,
              priority: 2,
              samples: null,
              min: 32288768,
              max: 4138700800,
              url: 0
            }
          ],
          tables: [
            {
              id: 'kubernetes_labels_',
              label: 'Kubernetes labels',
              type: 'property-list',
              columns: null,
              rows: [
                {
                  id: 'label_io.cilium/app',
                  entries: {
                    label: 'io.cilium/app',
                    value: 'operator'
                  }
                },
                {
                  id: 'label_name',
                  entries: {
                    label: 'name',
                    value: 'cilium-operator'
                  }
                }
              ]
            }
          ]
        },
        '48f1fa9d-5890-11e9-80d7-ce3760099703;\\u003cdaemonset\\u003e': {
          id: '48f1fa9d-5890-11e9-80d7-ce3760099703;\\u003cdaemonset\\u003e',
          label: 'traefik-ingress-controller',
          labelMinor: 'DaemonSet of 2 pods',
          rank: 'kube-system/traefik-ingress-controller',
          shape: 'pentagon',
          stack: true,
          metadata: [
            {
              id: 'kubernetes_node_type',
              label: 'Type',
              value: 'DaemonSet',
              priority: 1
            },
            {
              id: 'kubernetes_namespace',
              label: 'Namespace',
              value: 'kube-system',
              priority: 2
            },
            {
              id: 'kubernetes_created',
              label: 'Created',
              value: '2019-04-06T17:20:33Z',
              priority: 3,
              dataType: 'datetime'
            },
            {
              id: 'kubernetes_desired_replicas',
              label: 'Desired replicas',
              value: 2,
              priority: 4,
              dataType: 'number'
            },
            {
              id: 'pod',
              label: '# Pods',
              value: 2,
              priority: 5,
              dataType: 'number'
            }
          ],
          tables: [
            {
              id: 'kubernetes_labels_',
              label: 'Kubernetes labels',
              type: 'property-list',
              columns: null,
              rows: [
                {
                  id: 'label_k8s-app',
                  entries: {
                    label: 'k8s-app',
                    value: 'traefik-ingress-lb'
                  }
                }
              ]
            }
          ],
          adjacency: [
            '2ff26e19-5893-11e9-80d7-ce3760099703;\\u003cdeployment\\u003e',
            '6cb6d43e-596a-11e9-80d7-ce3760099703;\\u003cdeployment\\u003e',
            'pseudo:unmanaged:'
          ]
        },
        '2ff26e19-5893-11e9-80d7-ce3760099703;\\u003cdeployment\\u003e': {
          id: '2ff26e19-5893-11e9-80d7-ce3760099703;\\u003cdeployment\\u003e',
          label: 'weave-scope-app',
          labelMinor: 'Deployment of 1 pod',
          rank: 'weave/weave-scope-app',
          shape: 'heptagon',
          stack: true,
          metadata: [
            {
              id: 'kubernetes_node_type',
              label: 'Type',
              value: 'Deployment',
              priority: 1
            },
            {
              id: 'kubernetes_namespace',
              label: 'Namespace',
              value: 'weave',
              priority: 2
            },
            {
              id: 'kubernetes_created',
              label: 'Created',
              value: '2019-04-06T17:41:19Z',
              priority: 3,
              dataType: 'datetime'
            },
            {
              id: 'kubernetes_observed_generation',
              label: 'Observed gen.',
              value: 1,
              priority: 4,
              dataType: 'number'
            },
            {
              id: 'kubernetes_desired_replicas',
              label: 'Desired replicas',
              value: 1,
              priority: 5,
              dataType: 'number'
            },
            {
              id: 'pod',
              label: '# Pods',
              value: 1,
              priority: 6,
              dataType: 'number'
            },
            {
              id: 'kubernetes_strategy',
              label: 'Strategy',
              value: 'RollingUpdate',
              priority: 7
            }
          ],
          metrics: [
            {
              id: 'docker_cpu_total_usage',
              label: 'CPU',
              format: 'percent',
              value: 0.03,
              priority: 1,
              samples: null,
              min: 0.039530445544554454,
              max: 100,
              url: 0
            },
            {
              id: 'docker_memory_usage',
              label: 'Memory',
              format: 'filesize',
              value: 228126720,
              priority: 2,
              samples: null,
              min: 227880960,
              max: 4138700800,
              url: 0
            }
          ],
          tables: [
            {
              id: 'kubernetes_labels_',
              label: 'Kubernetes labels',
              type: 'property-list',
              columns: null,
              rows: [
                {
                  id: 'label_app',
                  entries: {
                    label: 'app',
                    value: 'weave-scope'
                  }
                },
                {
                  id: 'label_name',
                  entries: {
                    label: 'name',
                    value: 'weave-scope-app'
                  }
                },
                {
                  id: 'label_weave-cloud-component',
                  entries: {
                    label: 'weave-cloud-component',
                    value: 'scope'
                  }
                },
                {
                  id: 'label_weave-scope-component',
                  entries: {
                    label: 'weave-scope-component',
                    value: 'app'
                  }
                }
              ]
            }
          ]
        },
        '6949e8dd-589e-11e9-80d7-ce3760099703;\\u003cstatefulset\\u003e': {
          id: '6949e8dd-589e-11e9-80d7-ce3760099703;\\u003cstatefulset\\u003e',
          label: 'redis-master',
          labelMinor: 'StatefulSet of 1 pod',
          rank: 'inaregames-com/redis-master',
          shape: 'octagon',
          stack: true,
          metadata: [
            {
              id: 'kubernetes_node_type',
              label: 'Type',
              value: 'StatefulSet',
              priority: 1
            },
            {
              id: 'kubernetes_namespace',
              label: 'Namespace',
              value: 'inaregames-com',
              priority: 2
            },
            {
              id: 'kubernetes_created',
              label: 'Created',
              value: '2019-04-06T19:01:40Z',
              priority: 3,
              dataType: 'datetime'
            },
            {
              id: 'kubernetes_observed_generation',
              label: 'Observed gen.',
              value: 2,
              priority: 4,
              dataType: 'number'
            },
            {
              id: 'kubernetes_desired_replicas',
              label: 'Desired replicas',
              value: 1,
              priority: 5,
              dataType: 'number'
            },
            {
              id: 'pod',
              label: '# Pods',
              value: 1,
              priority: 6,
              dataType: 'number'
            }
          ],
          metrics: [
            {
              id: 'docker_cpu_total_usage',
              label: 'CPU',
              format: 'percent',
              value: 0.06,
              priority: 1,
              samples: null,
              min: 0.0561650495049505,
              max: 100,
              url: 0
            },
            {
              id: 'docker_memory_usage',
              label: 'Memory',
              format: 'filesize',
              value: 198537216,
              priority: 2,
              samples: null,
              min: 198533120,
              max: 4138717184,
              url: 0
            }
          ],
          tables: [
            {
              id: 'kubernetes_labels_',
              label: 'Kubernetes labels',
              type: 'property-list',
              columns: null,
              rows: [
                {
                  id: 'label_app',
                  entries: {
                    label: 'app',
                    value: 'redis'
                  }
                },
                {
                  id: 'label_chart',
                  entries: {
                    label: 'chart',
                    value: 'redis-6.4.4'
                  }
                },
                {
                  id: 'label_heritage',
                  entries: {
                    label: 'heritage',
                    value: 'Tiller'
                  }
                },
                {
                  id: 'label_release',
                  entries: {
                    label: 'release',
                    value: 'redis'
                  }
                }
              ]
            }
          ],
          adjacency: [
            'pseudo:unmanaged:'
          ]
        },
        '0e3deaae-7cd3-11e9-a23a-623240fec8d2;\\u003cdeployment\\u003e': {
          id: '0e3deaae-7cd3-11e9-a23a-623240fec8d2;\\u003cdeployment\\u003e',
          label: 'kube-state-metrics',
          labelMinor: 'Deployment of 1 pod',
          rank: 'kube-system/kube-state-metrics',
          shape: 'heptagon',
          stack: true,
          metadata: [
            {
              id: 'kubernetes_node_type',
              label: 'Type',
              value: 'Deployment',
              priority: 1
            },
            {
              id: 'kubernetes_namespace',
              label: 'Namespace',
              value: 'kube-system',
              priority: 2
            },
            {
              id: 'kubernetes_created',
              label: 'Created',
              value: '2019-05-22T20:49:13Z',
              priority: 3,
              dataType: 'datetime'
            },
            {
              id: 'kubernetes_observed_generation',
              label: 'Observed gen.',
              value: 1,
              priority: 4,
              dataType: 'number'
            },
            {
              id: 'kubernetes_desired_replicas',
              label: 'Desired replicas',
              value: 1,
              priority: 5,
              dataType: 'number'
            },
            {
              id: 'pod',
              label: '# Pods',
              value: 1,
              priority: 6,
              dataType: 'number'
            },
            {
              id: 'kubernetes_strategy',
              label: 'Strategy',
              value: 'RollingUpdate',
              priority: 7
            }
          ],
          metrics: [
            {
              id: 'docker_cpu_total_usage',
              label: 'CPU',
              format: 'percent',
              value: 0,
              priority: 1,
              samples: null,
              min: 0,
              max: 100,
              url: 0
            },
            {
              id: 'docker_memory_usage',
              label: 'Memory',
              format: 'filesize',
              value: 15941632,
              priority: 2,
              samples: null,
              min: 15941632,
              max: 4138700800,
              url: 0
            }
          ],
          tables: [
            {
              id: 'kubernetes_labels_',
              label: 'Kubernetes labels',
              type: 'property-list',
              columns: null,
              rows: []
            }
          ]
        }
      }
    };

    this.state = this.state.set('timeTravelTransitioning', false);
    this.state = this.state.set('nodes', fromJS(nodes.nodes));
    this.state = this.state.set('nodesLoaded', true);

    const nodesForCurrentTopologyKey = ['nodesByTopology', this.state.get('currentTopologyId')];
    this.state = this.state.setIn(nodesForCurrentTopologyKey, this.state.get('nodes'));

    this.State.setState(this.state);
  }

  getDefaultTopologyOptions() {
    let topologyOptions = makeOrderedMap();
    this.state.get('topologies').forEach((topology) => {
      let defaultOptions = makeOrderedMap();
      if (topology.has('options') && topology.get('options')) {
        topology.get('options').forEach((option) => {
          const optionId = option.get('id');
          const defaultValue = option.get('defaultValue');
          defaultOptions = defaultOptions.set(optionId, [defaultValue]);
        });
      }
      if (defaultOptions.size) {
        topologyOptions = topologyOptions.set(topology.get('id'), defaultOptions);
      }
    });
    return topologyOptions;
  }

  getDefaultTopology(topologies) {
    const flatTopologies = topologies
      .flatMap(t => makeList([t]).concat(t.get('sub_topologies', makeList())));

    const TOPOLOGY_DISPLAY_PRIORITY = [
      'ecs-services',
      'ecs-tasks',
      'kube-controllers',
      'services',
      'replica-sets',
      'pods',
      'containers',
    ];

    return flatTopologies
      .sortBy((t) => {
        const index = TOPOLOGY_DISPLAY_PRIORITY.indexOf(t.get('id'));
        return index === -1 ? Infinity : index;
      })
      .getIn([0, 'id']);
  }

  processTopologies() {
    const topologies = [
      {
        hide_if_empty: false,
        name: 'Containers',
        options: [
          {
            defaultValue: 'application',
            id: 'system',
            options: [
              {
                label: 'All',
                value: 'all'
              },
              {
                label: 'System containers',
                value: 'system'
              },
              {
                label: 'Application containers',
                value: 'application'
              }
            ]
          },
          {
            defaultValue: 'running',
            id: 'stopped',
            options: [
              {
                label: 'Stopped containers',
                value: 'stopped'
              },
              {
                label: 'Running containers',
                value: 'running'
              },
              {
                label: 'Both',
                value: 'both'
              }
            ]
          },
          {
            defaultValue: 'hide',
            id: 'pseudo',
            options: [
              {
                label: 'Show uncontained',
                value: 'show'
              },
              {
                label: 'Hide uncontained',
                value: 'hide'
              }
            ]
          },
          {
            defaultValue: '',
            id: 'namespace',
            noneLabel: 'All Namespaces',
            options: [
              {
                label: 'default',
                value: 'default'
              },
              {
                label: 'inaregames-com',
                value: 'inaregames-com'
              },
              {
                label: 'isartnavarro-io',
                value: 'isartnavarro-io'
              },
              {
                label: 'kube-public',
                value: 'kube-public'
              },
              {
                label: 'kube-system',
                value: 'kube-system'
              },
              {
                label: 'monitoring',
                value: 'monitoring'
              },
              {
                label: 'weave',
                value: 'weave'
              },
              {
                label: 'wiki',
                value: 'wiki'
              }
            ],
            selectType: 'union'
          }
        ],
        rank: 2,
        stats: {
          edge_count: 7,
          filtered_nodes: 119,
          node_count: 15,
          nonpseudo_node_count: 14
        },
        sub_topologies: [
          {
            hide_if_empty: false,
            name: 'by DNS name',
            options: [
              {
                defaultValue: 'application',
                id: 'system',
                options: [
                  {
                    label: 'All',
                    value: 'all'
                  },
                  {
                    label: 'System containers',
                    value: 'system'
                  },
                  {
                    label: 'Application containers',
                    value: 'application'
                  }
                ]
              },
              {
                defaultValue: 'running',
                id: 'stopped',
                options: [
                  {
                    label: 'Stopped containers',
                    value: 'stopped'
                  },
                  {
                    label: 'Running containers',
                    value: 'running'
                  },
                  {
                    label: 'Both',
                    value: 'both'
                  }
                ]
              },
              {
                defaultValue: 'hide',
                id: 'pseudo',
                options: [
                  {
                    label: 'Show uncontained',
                    value: 'show'
                  },
                  {
                    label: 'Hide uncontained',
                    value: 'hide'
                  }
                ]
              },
              {
                defaultValue: '',
                id: 'namespace',
                noneLabel: 'All Namespaces',
                options: [
                  {
                    label: 'default',
                    value: 'default'
                  },
                  {
                    label: 'inaregames-com',
                    value: 'inaregames-com'
                  },
                  {
                    label: 'isartnavarro-io',
                    value: 'isartnavarro-io'
                  },
                  {
                    label: 'kube-public',
                    value: 'kube-public'
                  },
                  {
                    label: 'kube-system',
                    value: 'kube-system'
                  },
                  {
                    label: 'monitoring',
                    value: 'monitoring'
                  },
                  {
                    label: 'weave',
                    value: 'weave'
                  },
                  {
                    label: 'wiki',
                    value: 'wiki'
                  }
                ],
                selectType: 'union'
              }
            ],
            rank: 0,
            stats: {
              edge_count: 12,
              filtered_nodes: 3,
              node_count: 52,
              nonpseudo_node_count: 51
            },
            url: '/api/topology/containers-by-hostname'
          },
          {
            hide_if_empty: false,
            name: 'by image',
            options: [
              {
                defaultValue: 'application',
                id: 'system',
                options: [
                  {
                    label: 'All',
                    value: 'all'
                  },
                  {
                    label: 'System containers',
                    value: 'system'
                  },
                  {
                    label: 'Application containers',
                    value: 'application'
                  }
                ]
              },
              {
                defaultValue: 'running',
                id: 'stopped',
                options: [
                  {
                    label: 'Stopped containers',
                    value: 'stopped'
                  },
                  {
                    label: 'Running containers',
                    value: 'running'
                  },
                  {
                    label: 'Both',
                    value: 'both'
                  }
                ]
              },
              {
                defaultValue: 'hide',
                id: 'pseudo',
                options: [
                  {
                    label: 'Show uncontained',
                    value: 'show'
                  },
                  {
                    label: 'Hide uncontained',
                    value: 'hide'
                  }
                ]
              },
              {
                defaultValue: '',
                id: 'namespace',
                noneLabel: 'All Namespaces',
                options: [
                  {
                    label: 'default',
                    value: 'default'
                  },
                  {
                    label: 'inaregames-com',
                    value: 'inaregames-com'
                  },
                  {
                    label: 'isartnavarro-io',
                    value: 'isartnavarro-io'
                  },
                  {
                    label: 'kube-public',
                    value: 'kube-public'
                  },
                  {
                    label: 'kube-system',
                    value: 'kube-system'
                  },
                  {
                    label: 'monitoring',
                    value: 'monitoring'
                  },
                  {
                    label: 'weave',
                    value: 'weave'
                  },
                  {
                    label: 'wiki',
                    value: 'wiki'
                  }
                ],
                selectType: 'union'
              }
            ],
            rank: 0,
            stats: {
              edge_count: 5,
              filtered_nodes: 7,
              node_count: 22,
              nonpseudo_node_count: 21
            },
            url: '/api/topology/containers-by-image'
          }
        ],
        url: '/api/topology/containers'
      },
      {
        hide_if_empty: false,
        name: 'Hosts',
        options: null,
        rank: 4,
        stats: {
          edge_count: 5,
          filtered_nodes: 1,
          node_count: 3,
          nonpseudo_node_count: 2
        },
        sub_topologies: [
          {
            hide_if_empty: false,
            name: 'Weave Net',
            options: null,
            rank: 0,
            stats: {
              edge_count: 0,
              filtered_nodes: 0,
              node_count: 0,
              nonpseudo_node_count: 0
            },
            url: '/api/topology/weave'
          }
        ],
        url: '/api/topology/hosts'
      },
      {
        hide_if_empty: true,
        name: 'Pods',
        options: [
          {
            defaultValue: 'hide',
            id: 'snapshot',
            options: [
              {
                label: 'Show snapshots',
                value: 'show'
              },
              {
                label: 'Hide snapshots',
                value: 'hide'
              }
            ]
          },
          {
            defaultValue: 'hide',
            id: 'storage',
            options: [
              {
                label: 'Show storage',
                value: 'show'
              },
              {
                label: 'Hide storage',
                value: 'hide'
              }
            ]
          },
          {
            defaultValue: 'hide',
            id: 'pseudo',
            options: [
              {
                label: 'Show unmanaged',
                value: 'show'
              },
              {
                label: 'Hide unmanaged',
                value: 'hide'
              }
            ]
          },
          {
            defaultValue: '',
            id: 'namespace',
            noneLabel: 'All Namespaces',
            options: [
              {
                label: 'default',
                value: 'default'
              },
              {
                label: 'inaregames-com',
                value: 'inaregames-com'
              },
              {
                label: 'isartnavarro-io',
                value: 'isartnavarro-io'
              },
              {
                label: 'kube-public',
                value: 'kube-public'
              },
              {
                label: 'kube-system',
                value: 'kube-system'
              },
              {
                label: 'monitoring',
                value: 'monitoring'
              },
              {
                label: 'weave',
                value: 'weave'
              },
              {
                label: 'wiki',
                value: 'wiki'
              }
            ],
            selectType: 'union'
          }
        ],
        rank: 3,
        stats: {
          edge_count: 13,
          filtered_nodes: 16,
          node_count: 36,
          nonpseudo_node_count: 35
        },
        sub_topologies: [
          {
            hide_if_empty: true,
            name: 'Controllers',
            options: [
              {
                defaultValue: 'hide',
                id: 'pseudo',
                options: [
                  {
                    label: 'Show unmanaged',
                    value: 'show'
                  },
                  {
                    label: 'Hide unmanaged',
                    value: 'hide'
                  }
                ]
              },
              {
                defaultValue: '',
                id: 'namespace',
                noneLabel: 'All Namespaces',
                options: [
                  {
                    label: 'default',
                    value: 'default'
                  },
                  {
                    label: 'inaregames-com',
                    value: 'inaregames-com'
                  },
                  {
                    label: 'isartnavarro-io',
                    value: 'isartnavarro-io'
                  },
                  {
                    label: 'kube-public',
                    value: 'kube-public'
                  },
                  {
                    label: 'kube-system',
                    value: 'kube-system'
                  },
                  {
                    label: 'monitoring',
                    value: 'monitoring'
                  },
                  {
                    label: 'weave',
                    value: 'weave'
                  },
                  {
                    label: 'wiki',
                    value: 'wiki'
                  }
                ],
                selectType: 'union'
              }
            ],
            rank: 0,
            stats: {
              edge_count: 11,
              filtered_nodes: 4,
              node_count: 26,
              nonpseudo_node_count: 25
            },
            url: '/api/topology/kube-controllers'
          },
          {
            hide_if_empty: true,
            name: 'Services',
            options: [
              {
                defaultValue: 'hide',
                id: 'pseudo',
                options: [
                  {
                    label: 'Show unmanaged',
                    value: 'show'
                  },
                  {
                    label: 'Hide unmanaged',
                    value: 'hide'
                  }
                ]
              },
              {
                defaultValue: '',
                id: 'namespace',
                noneLabel: 'All Namespaces',
                options: [
                  {
                    label: 'default',
                    value: 'default'
                  },
                  {
                    label: 'inaregames-com',
                    value: 'inaregames-com'
                  },
                  {
                    label: 'isartnavarro-io',
                    value: 'isartnavarro-io'
                  },
                  {
                    label: 'kube-public',
                    value: 'kube-public'
                  },
                  {
                    label: 'kube-system',
                    value: 'kube-system'
                  },
                  {
                    label: 'monitoring',
                    value: 'monitoring'
                  },
                  {
                    label: 'weave',
                    value: 'weave'
                  },
                  {
                    label: 'wiki',
                    value: 'wiki'
                  }
                ],
                selectType: 'union'
              }
            ],
            rank: 0,
            stats: {
              edge_count: 7,
              filtered_nodes: 4,
              node_count: 15,
              nonpseudo_node_count: 15
            },
            url: '/api/topology/services'
          }
        ],
        url: '/api/topology/pods'
      },
      {
        hide_if_empty: true,
        name: 'Processes',
        options: [
          {
            defaultValue: 'hide',
            id: 'unconnected',
            options: [
              {
                label: 'Show unconnected',
                value: 'show'
              },
              {
                label: 'Hide unconnected',
                value: 'hide'
              }
            ]
          }
        ],
        rank: 1,
        stats: {
          edge_count: 8,
          filtered_nodes: 331,
          node_count: 11,
          nonpseudo_node_count: 10
        },
        sub_topologies: [
          {
            hide_if_empty: true,
            name: 'by name',
            options: [
              {
                defaultValue: 'hide',
                id: 'unconnected',
                options: [
                  {
                    label: 'Show unconnected',
                    value: 'show'
                  },
                  {
                    label: 'Hide unconnected',
                    value: 'hide'
                  }
                ]
              }
            ],
            rank: 0,
            stats: {
              edge_count: 4,
              filtered_nodes: 123,
              node_count: 5,
              nonpseudo_node_count: 4
            },
            url: '/api/topology/processes-by-name'
          }
        ],
        url: '/api/topology/processes'
      },
      {
        hide_if_empty: true,
        name: 'Services',
        options: [
          {
            defaultValue: 'hide',
            id: 'pseudo',
            options: [
              {
                label: 'Show unmanaged',
                value: 'show'
              },
              {
                label: 'Hide unmanaged',
                value: 'hide'
              }
            ]
          }
        ],
        rank: 3,
        stats: {
          edge_count: 0,
          filtered_nodes: 0,
          node_count: 0,
          nonpseudo_node_count: 0
        },
        url: '/api/topology/swarm-services'
      },
      {
        hide_if_empty: true,
        name: 'Tasks',
        options: [
          {
            defaultValue: 'hide',
            id: 'pseudo',
            options: [
              {
                label: 'Show unmanaged',
                value: 'show'
              },
              {
                label: 'Hide unmanaged',
                value: 'hide'
              }
            ]
          }
        ],
        rank: 3,
        stats: {
          edge_count: 0,
          filtered_nodes: 0,
          node_count: 0,
          nonpseudo_node_count: 0
        },
        sub_topologies: [
          {
            hide_if_empty: true,
            name: 'Services',
            options: [
              {
                defaultValue: 'hide',
                id: 'pseudo',
                options: [
                  {
                    label: 'Show unmanaged',
                    value: 'show'
                  },
                  {
                    label: 'Hide unmanaged',
                    value: 'hide'
                  }
                ]
              }
            ],
            rank: 0,
            stats: {
              edge_count: 0,
              filtered_nodes: 0,
              node_count: 0,
              nonpseudo_node_count: 0
            },
            url: '/api/topology/ecs-services'
          }
        ],
        url: '/api/topology/ecs-tasks'
      }
    ];

    // add IDs to topology objects in-place
    const topologiesWithId = this.updateTopologyIds(topologies);
    // filter out hidden topos
    const visibleTopologies = this.filterHiddenTopologies(topologiesWithId, this.state.get('currentTopology'));
    // set `selectType` field for topology and sub_topologies options (recursive).
    const topologiesWithSelectType = visibleTopologies.map(this.calcSelectType);
    // cache URLs by ID
    this.state = this.state.set(
      'topologyUrlsById',
      this.setTopologyUrlsById(this.state.get('topologyUrlsById'), topologiesWithSelectType)
    );

    const topologiesWithFullnames = this.addTopologyFullname(topologiesWithSelectType);
    const immNextTopologies = fromJS(topologiesWithFullnames).sortBy(topology => topology.get('rank'));
    return this.state = this.state.set('topologies', immNextTopologies);
  }

  addTopologyFullname(topologies) {
    return topologies.map((t) => {
      if (!t.sub_topologies) {
        return Object.assign({}, t, {fullName: t.name});
      }
      return Object.assign({}, t, {
        fullName: t.name,
        sub_topologies: t.sub_topologies.map(st => (
          Object.assign({}, st, {fullName: `${t.name} ${st.name}`})
        ))
      });
    });
  }

  setTopologyUrlsById(topologyUrlsById, topologies) {
    let urlMap = topologyUrlsById;
    if (topologies) {
      topologies.forEach((topology) => {
        urlMap = urlMap.set(topology.id, topology.url);
        if (topology.sub_topologies) {
          topology.sub_topologies.forEach((subTopology) => {
            urlMap = urlMap.set(subTopology.id, subTopology.url);
          });
        }
      });
    }
    return urlMap;
  }

  calcSelectType(topology) {
    const result = {
      ...topology,
      options: topology.options && topology.options.map((option) => {
        // Server doesn't return the `selectType` key unless the option is something other than `one`.
        // Default to `one` if undefined, so the component doesn't have to handle this.
        option.selectType = option.selectType || 'one';
        return option;
      })
    };

    if (topology.sub_topologies) {
      result.sub_topologies = topology.sub_topologies.map(this.calcSelectType);
    }
    return result;
  }

  filterHiddenTopologies(topologies, currentTopology) {
    currentTopology = currentTopology || makeMap();
    return topologies.filter(t => (!t.hide_if_empty || t.stats.node_count > 0
      || t.stats.filtered_nodes > 0 || t.id === currentTopology.get('id')
      || t.id === currentTopology.get('parentId')));
  }

  updateTopologyIds(topologies, parentId?) {
    return topologies.map((topology) => {
      const result = Object.assign({}, topology);
      result.id = topology.url.split('/').pop();
      if (parentId) {
        result.parentId = parentId;
      }
      if (topology.sub_topologies) {
        result.sub_topologies = this.updateTopologyIds(topology.sub_topologies, result.id);
      }
      return result;
    });
  }
}
