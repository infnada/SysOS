import * as fs from 'fs';
import * as path from 'path';

import {GlobalsModule} from '../../globals';
import {SshSessionsModule} from '../../../../socket/modules/ssh/ssh-sessions';

export class HidsModule {

  private GlobalsModule: GlobalsModule = new GlobalsModule(this.Connection);

  constructor(private Connection: SshSessionsModule) {

  }

  private first: string;
  private second: string;

  private matched: number = 0;
  private currentResult: {
    line: string;
    condition: string;
    status: string;
    lines: {
      line: string;
      result: string;
    }[];
  };

  /**
   * Final Array of results
   */
  private results = [];


  private parseNameType(line: string): Promise<string> {
    let condition: string;
    let m;

    return new Promise((resolve) => {
      const regex = /^\[.*]\s?\[(all|any|none|any required|all required)].*$/g;
      while ((m = regex.exec(line)) !== null) {
        if (m.index === regex.lastIndex) regex.lastIndex++;

        if (m.length <= 1) {
          condition = null;
        } else {
          condition = m[1];
        }
      }

      return resolve(condition);
    });
  }

  private parseFileType(regexConditions: {
    type: string;
    regex: string;
  }[]): Promise<number> {
    let totalMatch: number  = 0;
    let matchedStatus: number = 0;

    return this.GlobalsModule.execAsync(`cat ${this.first}`).then((data) => {
      data = data.trim();

      const fileContents: string = data.split(/\r?\n/);
      if (fileContents.length === 0) return 0;

      // Each line of file
      for (const fileLine of fileContents) {
        if (fileLine.length === 0) continue;

        // Check conditions
        for (const regCondition of regexConditions) {
          if (regCondition.type.charAt(0) === 'r' && fileLine.match(regCondition.regex)) {
            ++totalMatch;
          } else if (regCondition.type.charAt(0) === '!' && regCondition.type.charAt(1) === 'r' && !fileLine.match(regCondition.regex)) {
            ++totalMatch;
          } else if (regCondition.type.charAt(0) === '=' && data === regCondition.regex) {
            ++totalMatch;
          } else {
            break;
          }
        }

        if (totalMatch === regexConditions.length) {
          matchedStatus = 1;
          break;
        }
      }

      return matchedStatus;

    }).catch((e) => {
      console.log(e);
      return e;
    });
  }

  private parseDirType(regexConditions: {
    type: string;
    regex: string;
  }[]): Promise<number> {
    return new Promise((resolve, reject) => {
      return resolve(0);
    });
  }

  private parseProcessType(regexConditions: {
    type: string;
    regex: string;
  }[]): Promise<number> {
    return new Promise((resolve, reject) => {
      return resolve(0);
    });
  }

  private parseInlineType(regexConditions: {
    type: string;
    regex: string;
  }[]): Promise<number> {
    let totalMatch: number = 0;
    let matchedStatus: number = 0;

    return this.GlobalsModule.execAsync(this.first).then((data) => {
      data = data.trim();

      const dataContents = data.split(/\r?\n/);

      // Each line of data
      for (const dContent of dataContents) {

        // Check conditions
        for (const regCondition of regexConditions) {
          if (regCondition.type.charAt(0) === 'r' && dContent.match(regCondition.regex)) {
            ++totalMatch;
          } else if (regCondition.type.charAt(0) === '!' && regCondition.type.charAt(1) === 'r' && !dContent.match(regCondition.regex)) {
            ++totalMatch;
          } else if (regCondition.type.charAt(0) === '=' && data === regCondition.regex) {
            ++totalMatch;
          } else {
            break;
          }
        }

        if (totalMatch === regexConditions.length) {
          matchedStatus = 1;
          break;
        }
      }

      return matchedStatus;

    }).catch((e) => {
      console.log(e);
      return e;
    });
  }

  private checkMatch(line: string, match: number): Promise<void> {
    return new Promise((resolve) => {

      if ((this.currentResult.condition === 'any' || this.currentResult.condition === 'any required') && match === 1) {
        this.currentResult.lines.push({line, result: 'passed'});
        this.matched = 3;
      } else if ((this.currentResult.condition === 'any' || this.currentResult.condition === 'any required') && match === 0) {
        this.currentResult.lines.push({line, result: 'not passed right now'});
        this.matched = 5;
      } else if ((this.currentResult.condition === 'all' || this.currentResult.condition === 'all required') && match === 0) {
        this.currentResult.lines.push({line, result: 'not passed'});
        this.matched = 2;
      } else if ((this.currentResult.condition === 'all' || this.currentResult.condition === 'all required') && match === 1) {
        this.currentResult.lines.push({line, result: 'passed right now'});
        this.matched = 1;
      } else if (this.currentResult.condition === 'none' && match === 1) {
        this.currentResult.lines.push({line, result: 'not passed'});
        this.matched = 2;
      } else if (this.currentResult.condition === 'none' && match === 0) {
        this.currentResult.lines.push({line, result: 'passed right now'});
        this.matched = 4;
      } else {
        this.currentResult.lines.push({line, result: 'not passed right now'});
        this.matched = 5;
      }

      return resolve();
    });
  }

  private doWithLine(line: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const regexConditions = [];
      let m;
      let type;
      let segments;
      let regex;
      let firstChar = line.charAt(0);
      const lastChar = line.substr(line.length - 1);

      line = line.trim();

      // return if empty line or start with "#"
      if (line.length === 0 || firstChar === '#') return resolve('nothing_to_do');

      // Get types - removing negate flash (using later)
      if (firstChar === '!') firstChar = line.charAt(1);

      /**
       * Get line tyoe
       */
      if (firstChar === 'f') type = 'file';
      else if (firstChar === 'p') type = 'process';
      else if (firstChar === 'd') type = 'dir';
      else if (firstChar === 'i') type = 'inline';
      else if (firstChar === '[' && lastChar === ']') type = 'name';
      else return resolve('nothing_to_do_type');

      /**
       * Get name conditions
       */
      if (type === 'name') {

        // Last status is "passed". Final status = Passed
        if (this.matched === 1) {
          this.currentResult.status = 'Passed';
          this.results.push(this.currentResult);
        }

        // Last status is "not passed". Final status = Not Passed
        if (this.matched === 2) {
          this.results.push(this.currentResult);
        }

        // Last status is "passed". Final status = Passed
        if (this.matched === 3) {
          this.currentResult.status = 'Passed';
          this.results.push(this.currentResult);
        }

        // Last status is "passed right now". Final status = Passed
        if (this.matched === 4) {
          this.currentResult.status = 'Passed';
          this.results.push(this.currentResult);
        }

        // Last status is "not passed right now". Final status = Not Passed
        if (this.matched === 5) {
          this.results.push(this.currentResult);
        }

        this.matched = 0;

        return this.parseNameType(line).then((condition) => {

          if (condition === null) return resolve('nothing_to_do_condition');

          // Set new name to results
          this.currentResult = {
            line,
            condition,
            lines: [],
            status: 'Not Passed'
          };

          return resolve();
        });
      }

      /**
       * Check if already passed the previous condition
       */
      if (this.matched === 2 || this.matched === 3) {
        this.currentResult.lines.push({
          line,
          result: 'not needed'
        });
        return resolve();
      }

      /**
       * Get line params
       */
      regex = /^[f|p|d|i]:(.*)\s\-\>\s(.*)$/g;
      while ((m = regex.exec(line)) !== null) {
        if (m.index === regex.lastIndex) regex.lastIndex++;
        if (m.length <= 2) return;
        this.first = m[1];
        this.second = m[2];
      }

      // Delete ";" char if its last character of second part of params line
      if (this.second.charAt(this.second.length - 1) === ';') this.second = this.second.slice(0, -1);

      // Get all params
      segments = this.second.split(' && ');

      for (const segment of segments) {
        regex = /^(!?r|!?=|!?<|!?>):(.*)$/g;
        while ((m = regex.exec(segment)) !== null) {

          if (m.index === regex.lastIndex) regex.lastIndex++;
          if (m[1] === 'r' || m[1] === '!r' || m[1] === '=' || m[1] === '>' || m[1] === '<') regexConditions.push({type: m[1], regex: m[2]});
        }
      }

      /**
       * Check file lines
       */
      if (type === 'file') {
        return this.parseFileType(regexConditions).then((match) => {

          return this.checkMatch(line, match);

        }).then(() => {

          return resolve();
        });
      }

      /**
       * Check files in directory
       */
      if (type === 'dir') {
        return this.parseDirType(regexConditions).then((match) => {

          return this.checkMatch(line, match);

        }).then(() => {

          return resolve();
        });
      }

      /**
       * Check process
       */
      if (type === 'process') {
        return this.parseProcessType(regexConditions).then((match) => {

          return this.checkMatch(line, match);

        }).then(() => {

          return resolve();
        });
      }

      /**
       * Check inline
       */
      if (type === 'inline') {
        return this.parseInlineType(regexConditions).then((match) => {

          return this.checkMatch(line, match);

        }).then(() => {

          return resolve();
        });
      }

      return reject('line not parsed');
    });
  }

  private async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  async runHids(program: string): Promise<any[]> {
    const lines = fs.readFileSync(path.join(__dirname, '../../filesystem/etc/applications/hids/rootchecks/cis_rhel7_linux_rcl.txt')).toString().split(/\r?\n/);

    await this.asyncForEach(lines, async (line) => {
      await this.doWithLine(line);
    });

    return this.results;
  }
}
