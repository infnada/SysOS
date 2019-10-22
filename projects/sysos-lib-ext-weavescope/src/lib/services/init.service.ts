import {Injectable, OnDestroy} from '@angular/core';
import {fromJS, List as makeList, Map as makeMap, OrderedMap as makeOrderedMap} from 'immutable';
import {includes} from 'lodash-es';
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
    this.updateStateFromNodes = this.updateStateFromNodes.bind(this);
  }

  ngOnDestroy() {
    this.destroySubject$.next();
  }

  updateStateFromNodes() {
    // Apply pinned searches, filters nodes that dont match.
    //this.state = applyPinnedSearches(state);

    // In case node or edge disappears before mouseleave event.
    const nodesIds = this.state.get('nodes').keySeq();
    if (!nodesIds.contains(this.state.get('mouseOverNodeId'))) {
      this.state = this.state.set('mouseOverNodeId', null);
    }
    if (!nodesIds.some(nodeId => includes(this.state.get('mouseOverEdgeId'), nodeId))) {
      this.state = this.state.set('mouseOverEdgeId', null);
    }

    const nodesForCurrentTopologyKey = ['nodesByTopology', this.state.get('currentTopologyId')];
    this.state = this.state.setIn(nodesForCurrentTopologyKey, this.state.get('nodes'));

    this.state = this.state.set('forceRelayout', false);

    this.State.setState(this.state);
  }

  init(nodes) {
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
