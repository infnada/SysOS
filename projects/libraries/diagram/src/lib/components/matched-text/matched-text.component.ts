import {ChangeDetectionStrategy, Component, Input, OnInit, SimpleChanges} from '@angular/core';

import {flatMap, compact} from 'lodash-es';

@Component({
  selector: 'aldiagram-matched-text',
  templateUrl: './matched-text.component.html',
  styleUrls: ['./matched-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchedTextComponent implements OnInit {
  @Input() readonly text: string = '';
  @Input() private readonly matches: string[] = [];

  chunks: {
    text: string;
    matched: boolean;
  }[];

  constructor() {

  }

  ngOnInit(): void {
    this.chunks = this.buildChunks(this.text, this.matches);
  }

  ngOnChanges(nextProps: SimpleChanges) {
    if (!nextProps.matches) return;

    const newChunks = this.buildChunks(this.text, nextProps.matches.currentValue);
    if (this.chunks !== newChunks) this.chunks = newChunks;
  }

  // For chunk = { text: 'abcd', matched: false } and match = 'bc', the output will be
  // [{ text: 'a', matched: false }, { text: 'bc', matched: true }, { text: 'd', matched: false }].
  private splitChunk = (chunk, match) =>
    compact(MatchedTextComponent.intersperse(chunk.text.split(match), match)).map(text => ({
      matched: text === match,
      text,
    }));


  // Splits the text into chunks by finding all occurences of all matches in the list.
  private buildChunks = (text, matches) => {
    let chunks = [{matched: false, text}];
    matches.forEach(match => {
      chunks = flatMap(
        chunks,
        // Only unmatched chunks can be further split by other matches
        chunk => (chunk.matched ? [chunk] : this.splitChunk(chunk, match))
      );
    });
    return chunks;
  };

  private static intersperse(arr, obj) {
    if (!arr.length) return [];
    if (arr.length === 1) return arr.slice(0);

    const items = [arr[0]];
    for (let i = 1, len = arr.length; i < len; ++i) {
      items.push(obj, arr[i]);
    }

    return items;
  }

}
