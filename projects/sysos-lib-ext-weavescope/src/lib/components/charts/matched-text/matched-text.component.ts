import {Component, Input, OnChanges} from '@angular/core';
import {flatMap, compact} from 'lodash-es';

@Component({
  selector: 'slews-matched-text',
  templateUrl: './matched-text.component.html',
  styleUrls: ['./matched-text.component.scss'],
})
export class MatchedTextComponent implements OnChanges {
  @Input() text: string = '';
  @Input() matches: string[] = [];

  state = {
    chunks: null
  };

  constructor() {
    this.state = {
      chunks: this.buildChunks(this.text, this.matches),
    };
  }

  ngOnChanges(nextProps) {
    if (nextProps.matches) {
      const newChunks = this.buildChunks(this.text, nextProps.matches.currentValue);
      if (this.state.chunks !== newChunks) this.state.chunks = newChunks;
    }
  }

  // For chunk = { text: 'abcd', matched: false } and match = 'bc', the output will be
  // [{ text: 'a', matched: false }, { text: 'bc', matched: true }, { text: 'd', matched: false }].
  splitChunk = (chunk, match) =>
    compact(this.intersperse(chunk.text.split(match), match)).map(text => ({
      matched: text === match,
      text,
    }))


  // Splits the text into chunks by finding all occurences of all matches in the list.
  buildChunks = (text, matches) => {
    let chunks = [{matched: false, text}];
    matches.forEach(match => {
      chunks = flatMap(
        chunks,
        // Only unmatched chunks can be further split by other matches
        chunk => (chunk.matched ? [chunk] : this.splitChunk(chunk, match))
      );
    });
    return chunks;
  }

  intersperse(arr, obj) {
    if (!arr.length) return [];
    if (arr.length === 1) return arr.slice(0);

    const items = [arr[0]];
    for (let i = 1, len = arr.length; i < len; ++i) {
      items.push(obj, arr[i]);
    }

    return items;
  }

}
