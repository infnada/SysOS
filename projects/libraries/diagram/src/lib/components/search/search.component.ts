import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {combineLatest, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {COMMA, ENTER, MatChipInputEvent} from '@anyopsos/lib-angular-material';

import {AnyOpsOSLibDiagramService} from '../../services/anyopsos-lib-diagram.service';
import {AnyOpsOSLibDiagramStateService} from '../../services/anyopsos-lib-diagram-state.service';
import {AnyOpsOSLibDiagramTopologyUtilsService} from '../../services/anyopsos-lib-diagram-topology-utils.service';
import {Node} from '../../types/node';

@Component({
  selector: 'aldiagram-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild('searchInput', {static: false}) searchInput: ElementRef<HTMLInputElement>;

  private destroySubject$: Subject<void> = new Subject();

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  pinnedSearches: string[] = [];

  topologiesLoaded: boolean;
  topologyNodeCountZero: boolean;
  searchMatchesCount: number = 0;
  searchHint: string;

  constructor(private readonly LibDiagram: AnyOpsOSLibDiagramService,
              private readonly LibDiagramState: AnyOpsOSLibDiagramStateService,
              private readonly LibDiagramTopologyUtils: AnyOpsOSLibDiagramTopologyUtilsService) {

  }

  ngOnInit(): void {

    // Listen for topologiesLoaded change
    this.LibDiagramState.topologiesLoaded
      .pipe(takeUntil(this.destroySubject$)).subscribe((topologiesLoaded: boolean) => this.topologiesLoaded = topologiesLoaded);

    // Listen for currentTopology change
    this.LibDiagramState.currentTopology
      .pipe(takeUntil(this.destroySubject$)).subscribe(() => this.topologyNodeCountZero = this.LibDiagramTopologyUtils.isTopologyNodeCountZero());

    // Listen for state changes and update searchMatchesCount & searchHint
    combineLatest(
      this.LibDiagramState.nodes,
      this.LibDiagramState.searchQuery
    ).pipe(takeUntil(this.destroySubject$)).subscribe(([nodes]) => {
      const searchMatches = this.LibDiagram.searchNodeMatches();

      this.searchMatchesCount = searchMatches.length;

      const hintData = SearchComponent.getHint(nodes);
      this.searchHint = `Try "${hintData.label}", "${hintData.metadataLabel}:${hintData.metadataValue}", or "cpu > 2%".`;
    });
  }

  private static shortenHintLabel(text: string): string {
    return text
      .split(' ')[0]
      .toLowerCase()
      .substr(0, 12);
  }

  private static slugify(label: string): string {
    const CLEAN_LABEL_REGEX = /[^A-Za-z0-9]/g;
    return label.replace(CLEAN_LABEL_REGEX, '').toLowerCase();
  }


  private static getHint(nodes: Node[]): { label: string; metadataLabel: string; metadataValue: string; }{
    let label = 'mycontainer';
    let metadataLabel = 'ip';
    let metadataValue = '10.1.0.1';

    const node = [...nodes.filter(n => !n.pseudo && n.metadata)].pop();

    if (node) {
      [label] = SearchComponent.shortenHintLabel(node.label).split('.');
      if (node.metadata) {
        const metadataField = node.metadata[0];
        metadataLabel = SearchComponent.shortenHintLabel(SearchComponent.slugify(metadataField.label)).split('.').pop();
        metadataValue = SearchComponent.shortenHintLabel(metadataField.value);
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
    this.LibDiagramState.setPinnedSearches(this.pinnedSearches);
    this.LibDiagramState.setSearchQuery(this.searchInput.nativeElement.value || '');

    this.applyPinnedSearches();
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

  addSearch(text: string): void {
    this.pinnedSearches.push(text);
    this.updateSearch();
  }

  applyPinnedSearches() {
    const pinnedSearches: string[] = this.LibDiagramState.$pinnedSearches.getValue();
    let nodes: Node[] = this.LibDiagramState.$nodes.getValue();

    // clear old filter state
    nodes = nodes.map(n => {
      n.filtered = false;
      return n;
    });

    if (pinnedSearches.length > 0) {
      pinnedSearches.forEach((query: string) => {
        const parsed = this.LibDiagram.parseQuery(query);
        if (parsed) {
          const nodeMatches = this.LibDiagram.searchTopology(nodes, parsed);
          const filteredNodes = nodes
            .map(node => {
              node.filtered = node.filtered // matched by previous pinned search
                || nodeMatches.length === 0 // no match, filter all nodes
                || !nodeMatches.some(n => n.id === node.id);

              return node;
            }); // filter matches

          this.LibDiagramState.setNodes(filteredNodes);
        }
      });
    }
  }

}
