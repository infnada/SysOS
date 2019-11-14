import {Component, ElementRef, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {List as makeList} from 'immutable';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

import {MatChipInputEvent} from '@anyopsos/lib-angular-material';

import {StateService} from '../../services/state.service';
import {SelectorsService} from '../../services/selectors.service';
import {TopologyUtilsService} from '../../services/utils/topology-utils.service';


@Component({
  selector: 'slews-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;

  private destroySubject$: Subject<void> = new Subject();
  private state;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  pinnedSearches: string[] = [];

  topologiesLoaded: boolean;
  topologyNodeCountZero: boolean;
  searchMatchesCount: number;

  constructor(private State: StateService,
              private Selectors: SelectorsService,
              private TopologyUtils: TopologyUtilsService) {
    this.State.currentState.pipe(takeUntil(this.destroySubject$)).subscribe(state => {
      this.state = state;

      this.searchMatchesCount = (this.Selectors.searchMatchCountByTopologySelector(state) as any).reduce((count, topologyMatchCount) => count + topologyMatchCount, 0);
      this.topologiesLoaded = this.state.get('topologiesLoaded');
      this.topologyNodeCountZero = this.TopologyUtils.isTopologyNodeCountZero(state);
    });
  }

  shortenHintLabel(text) {
    return text
      .split(' ')[0]
      .toLowerCase()
      .substr(0, 12);
  }

  slugify(label) {
    const CLEAN_LABEL_REGEX = /[^A-Za-z0-9]/g;
    return label.replace(CLEAN_LABEL_REGEX, '').toLowerCase();
  }


  getHint() {
    const nodes = this.state.get('nodes');
    let label = 'mycontainer';
    let metadataLabel = 'ip';
    let metadataValue = '10.1.0.1';

    const node = nodes.filter(n => !n.get('pseudo') && n.has('metadata')).last();
    if (node) {
      [label] = this.shortenHintLabel(node.get('label')).split('.');
      if (node.get('metadata')) {
        const metadataField = node.get('metadata').first();
        metadataLabel = this.shortenHintLabel(this.slugify(metadataField.get('label')))
          .split('.').pop();
        metadataValue = this.shortenHintLabel(metadataField.get('value'));
      }
    }

    return {
      label,
      metadataLabel,
      metadataValue
    };
  }

  openHelp() {

  }


  updateSearch() {
    this.state = this.state.set('pinnedSearches', makeList(this.pinnedSearches));
    this.state = this.state.set('searchQuery', this.searchInput.nativeElement.value || '');

    this.applyPinnedSearches();

    this.State.setState(this.state);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.addSearch(value);
    }

    if (input) {
      input.value = '';
    }
  }

  remove(search: string): void {
    const index = this.pinnedSearches.indexOf(search);
    if (index >= 0) {
      this.pinnedSearches.splice(index, 1);
      this.updateSearch();
    }
  }

  addSearch(fruit: string): void {
    this.pinnedSearches.push(fruit);
    this.updateSearch();
  }

  applyPinnedSearches() {
    // clear old filter state
    this.state = this.state.update(
      'nodes',
      nodes => nodes.map(node => node.set('filtered', false))
    );

    const pinnedSearches = this.state.get('pinnedSearches');
    if (pinnedSearches.size > 0) {
      this.state.get('pinnedSearches').forEach((query) => {
        const parsed = this.Selectors.parseQuery(query);
        if (parsed) {
          const nodeMatches = this.Selectors.searchTopology(this.state.get('nodes'), parsed);
          const filteredNodes = this.state.get('nodes')
            .map(node => node.set(
              'filtered',
              node.get('filtered') // matched by previous pinned search
              || nodeMatches.size === 0 // no match, filter all nodes
              || !nodeMatches.has(node.get('id'))
            )); // filter matches
          this.state = this.state.set('nodes', filteredNodes);
        }
      });
    }
  }
}
