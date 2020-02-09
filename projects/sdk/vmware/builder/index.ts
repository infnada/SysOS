import {emptyDir, pathExistsSync, readFile, unlink, writeFile} from 'fs-extra';
import {HTMLElement, parse} from 'node-html-parser';

interface MethodData {
  h1: string;
  parameterTable: HTMLElement;
  returnTable: HTMLElement;
  faultTable: HTMLElement;
  parameterProps: { name: string; type: string; }[];
  returns: string[];
  faults: string[];
}

interface FaultData {
  h1: string;
  parameterTable: HTMLElement;
  parameterProps: { name: string; type: string; }[];
  extends: string;
}

interface EnumData {
  h1: string;
  parameterTable: HTMLElement;
  parameterProps: string[];
}

interface DataData {
  h1: string;
  parameterTable: HTMLElement;
  parameterProps: { name: string; type: string; }[];
  extends: string;
}

class Init {

  private methodsData: MethodData[] = [];
  private faultData: FaultData[] = [];
  private enumData: EnumData[] = [];
  private dataData: DataData[] = [];

  async init() {
    await this.initFiles();
    await this.parseMethodFiles();
    await this.parseFaultFiles();
    await this.parseEnumFiles();
    await this.parseDataFiles();
    await this.printResults();
  }

  async initFiles() {
    await emptyDir(__dirname + '/../src/lib/types/methods');
    await emptyDir(__dirname + '/../src/lib/types/faults');
    await emptyDir(__dirname + '/../src/lib/types/enums');
    await emptyDir(__dirname + '/../src/lib/types/data');
  }

  async parseMethodFiles() {

    /**
     * Read main file and get methods links
     */
    const indexFileData: Buffer = await readFile(__dirname + '/../source-sdk/index-methods.html');

    const indexParsedHtml = parse(indexFileData.toString()) as HTMLElement & {
      valid: boolean;
    };

    // Get all links from file
    const links: HTMLElement[] = indexParsedHtml.querySelectorAll('a');

    const sourceFiles: string[] = [];

    links.forEach((link: HTMLElement) => {

      // Get only links that contains a title
      if (link.attributes.title && link.attributes.href) {

        const href: string = link.attributes.href;

        // Do not get links with a hash
        if (href.indexOf('#') !== -1) return;

        sourceFiles.push(href);
      }

    });

    // Remove all duplicates
    let uniqueSourceFiles: string[] = [...new Set(sourceFiles)];

    /**
     * Get methods data from each file
     */
    for (const sourceFile of uniqueSourceFiles) {
      const mothidFiledata: Buffer = await readFile(`${__dirname}/../source-sdk/${sourceFile}`);

      // Some <p> tags are not closed, which leads to wrong parse and wrong result. Just remove <p> tags...
      const methodParsedHtml = parse(mothidFiledata.toString().replace(/<p>/g, '').replace(/<\/p>/g, ''), {noFix: false}) as HTMLElement & {
        valid: boolean;
      };

      // Get all method names
      const h1es: HTMLElement[] = methodParsedHtml.querySelectorAll('h1').filter((h1: HTMLElement) => {
        return h1.innerHTML.indexOf('Managed Object -') === -1;
      });

      // Get all method parameters
      const tables: HTMLElement[] = methodParsedHtml.querySelectorAll('table');

      const methodsTables: HTMLElement[] = tables.filter((table: HTMLElement) => {
        return table.querySelectorAll('tr')[0].querySelectorAll('th').length === 3;
      });

      methodsTables.shift();

      // Get Return Value and Faults
      const returnsAndFaultsTables: HTMLElement[] = tables.filter((table: HTMLElement) => {
        return table.querySelectorAll('tr')[0].querySelectorAll('th').length === 2;
      });

      const retunTables: HTMLElement[] = returnsAndFaultsTables.filter(function (element: HTMLElement, index: number) {
        return (index % 2 === 0);
      });

      const faultTables: HTMLElement[] = returnsAndFaultsTables.filter(function (element: HTMLElement, index: number) {
        return (index % 2 !== 0);
      });

      const localMethodData: MethodData[] = h1es.map((k: HTMLElement, i: number) => {
        return {
          h1: h1es[i].innerHTML.split('(')[0],
          parameterTable: methodsTables[i],
          returnTable: retunTables[i],
          faultTable: faultTables[i],
          parameterProps: [],
          returns: [],
          faults: []
        };
      });

      // Extract properties from 'parameterTable'
      localMethodData.forEach((data: MethodData, index: number) => {
        data.parameterTable.querySelectorAll('tr').forEach((tr: HTMLElement, idx: number) => {

          // Dont want table head
          if (idx === 0) return;

          const tds: HTMLElement[] = tr.querySelectorAll('td');

          let propType: string = tds[1].innerHTML.replace(/(<([^>]+)>)/ig, '').replace(/\r\n/g, '');

          // Special case for ManagedObjectReference
          if (propType.indexOf(' to a ') !== -1) propType = `ManagedObjectReference & { $type: '${propType.substring(propType.lastIndexOf(' ')).trim()}'; }`;

          localMethodData[index].parameterProps.push({
            name: tds[0].innerHTML.replace(/(<([^>]+)>)/ig, ''),
            type: propType
          });

        });
      });

      // Extract return types from 'returnTable'
      localMethodData.forEach((data: MethodData, index: number) => {
        data.returnTable.querySelectorAll('tr').forEach((tr: HTMLElement, idx: number) => {

          // Dont want table head
          if (idx === 0) return;

          const tds: HTMLElement[] = tr.querySelectorAll('td');

          let propType: string = tds[0].innerHTML.replace(/(<([^>]+)>)/ig, '').replace(/\r\n/g, '');

          // Special case for ManagedObjectReference
          if (propType.indexOf(' to a ') !== -1) propType = `ManagedObjectReference & { $type: '${propType.substring(propType.lastIndexOf(' ')).trim()}'; }`;

          localMethodData[index].returns.push(
            propType
          );

        });
      });

      // Extract fault types from 'returnTable'
      localMethodData.forEach((data: MethodData, index: number) => {
        data.faultTable.querySelectorAll('tr').forEach((tr: HTMLElement, idx: number) => {

          // Dont want table head
          if (idx === 0) return;

          const tds: HTMLElement[] = tr.querySelectorAll('td');

          let propType: string = tds[0].innerHTML.replace(/(<([^>]+)>)/ig, '').replace(/\r\n/g, '');

          // Special case for ManagedObjectReference
          if (propType.indexOf(' to a ') !== -1) propType = `ManagedObjectReference & { $type: '${propType.substring(propType.lastIndexOf(' ')).trim()}'; }`;

          localMethodData[index].faults.push(
            propType
          );

        });
      });

      if (h1es.length !== methodsTables.length || h1es.length * 2 !== returnsAndFaultsTables.length) throw new Error('error_parsing_data');

      this.methodsData.push(...localMethodData);
    }


  }

  async parseFaultFiles() {

    /**
     * Read main file and get faults links
     */
    const indexFileData: Buffer = await readFile(__dirname + '/../source-sdk/index-faults.html');

    const indexParsedHtml = parse(indexFileData.toString()) as HTMLElement & {
      valid: boolean;
    };

    // Get all links from file
    const links: HTMLElement[] = indexParsedHtml.querySelectorAll('a');

    const sourceFiles: string[] = [];

    links.forEach((link: HTMLElement) => {

      // Get only links that contains a title
      if (link.attributes.title && link.attributes.href) {

        const href: string = link.attributes.href;

        // Do not get links with a hash
        if (href.indexOf('#') !== -1) return;

        sourceFiles.push(href);
      }

    });

    // Remove all duplicates
    let uniqueSourceFiles: string[] = [...new Set(sourceFiles)];

    /**
     * Get fault data from each file
     */
    for (const sourceFile of uniqueSourceFiles) {
      const faultFiledata: Buffer = await readFile(`${__dirname}/../source-sdk/${sourceFile}`);

      // Some <p> tags are not closed, which leads to wrong parse and wrong result. Just remove <p> tags...
      const faultParsedHtml = parse(faultFiledata.toString().replace(/<p>/g, '').replace(/<\/p>/g, ''), {noFix: false}) as HTMLElement & {
        valid: boolean;
      };

      // Get fault type name
      const faultName: string = faultParsedHtml.querySelectorAll('h1').find((h1: HTMLElement) => {
        return h1.innerHTML.indexOf('Fault -') !== -1;
      }).innerHTML.split('(')[0].replace('Fault - ', '');

      // Check if extends another property
      let localExtends: string;
      const extendsType: HTMLElement[] = faultParsedHtml.querySelectorAll('dl');

      extendsType.forEach((et: HTMLElement) => {

        // Get Extends
        const regexe = /Extends<\/dt>\r?\n<dd>\r?\n<a href="[a-zA-Z\/\-\.0-9]*">([a-zA-Z]*)<\/a>/gs;
        let me;

        while ((me = regexe.exec(et.innerHTML)) !== null) {
          if (me.index === regexe.lastIndex) regexe.lastIndex++;

          localExtends = me[1];
        }
      });

      // Get all fault parameters
      const tables: HTMLElement[] = faultParsedHtml.querySelectorAll('table');

      const faultTable: HTMLElement = tables.find((table: HTMLElement) => {
        return table.querySelectorAll('tr')[0].querySelectorAll('th').length === 3;
      });

      const localFaultData: FaultData = {
        h1: faultName,
        parameterTable: faultTable,
        parameterProps: [],
        extends: localExtends
      };

      // Extract properties from 'parameterTable'
      localFaultData.parameterTable.querySelectorAll('tr').forEach((tr: HTMLElement, idx: number) => {

        // Dont want table head
        if (idx === 0) return;

        const tds: HTMLElement[] = tr.querySelectorAll('td');

        // Inherited props and some other data
        if (!tds[1]) return;

        let propType: string = tds[1].innerHTML.replace(/(<([^>]+)>)/ig, '').replace(/\r\n/g, '');

        // Special case for ManagedObjectReference
        if (propType.indexOf(' to a ') !== -1) propType = `ManagedObjectReference & { $type: '${propType.substring(propType.lastIndexOf(' ')).trim()}'; }`;

        localFaultData.parameterProps.push({
          name: tds[0].innerHTML.replace(/(<([^>]+)>)/ig, ''),
          type: propType
        });

      });

      this.faultData.push(localFaultData);
    }


  }

  async parseEnumFiles() {

    /**
     * Read main file and get faults links
     */
    const indexFileData: Buffer = await readFile(__dirname + '/../source-sdk/index-e_types.html');

    const indexParsedHtml = parse(indexFileData.toString()) as HTMLElement & {
      valid: boolean;
    };

    // Get all links from file
    const links: HTMLElement[] = indexParsedHtml.querySelectorAll('a');

    const sourceFiles: string[] = [];

    links.forEach((link: HTMLElement) => {

      // Get only links that contains a title
      if (link.attributes.title && link.attributes.href) {

        const href: string = link.attributes.href;

        // Do not get links with a hash
        if (href.indexOf('#') !== -1) return;

        sourceFiles.push(href);
      }

    });

    // Remove all duplicates
    let uniqueSourceFiles: string[] = [...new Set(sourceFiles)];

    /**
     * Get enum data from each file
     */
    for (const sourceFile of uniqueSourceFiles) {
      const enumFiledata: Buffer = await readFile(`${__dirname}/../source-sdk/${sourceFile}`);

      // Some <p> tags are not closed, which leads to wrong parse and wrong result. Just remove <p> tags...
      const faultParsedHtml = parse(enumFiledata.toString().replace(/<p>/g, '').replace(/<\/p>/g, ''), {noFix: false}) as HTMLElement & {
        valid: boolean;
      };

      // Get fault type name
      const enumName: string = faultParsedHtml.querySelectorAll('h1').find((h1: HTMLElement) => {
        return h1.innerHTML.indexOf('Enum -') !== -1;
      }).innerHTML.split('(')[0].replace('Enum - ', '').trim();

      // Get all fault parameters
      const tables: HTMLElement[] = faultParsedHtml.querySelectorAll('table');

      const enumTable: HTMLElement = tables.find((table: HTMLElement) => {
        return table.querySelectorAll('tr')[0].querySelectorAll('th').length === 2;
      });

      const localEnumData: EnumData = {h1: enumName, parameterTable: enumTable, parameterProps: []};

      // Extract properties from 'parameterTable'
      localEnumData.parameterTable.querySelectorAll('tr').forEach((tr: HTMLElement, idx: number) => {

        // Dont want table head
        if (idx === 0) return;

        const tds: HTMLElement[] = tr.querySelectorAll('td');

        let propType: string = tds[0].innerHTML.substring(tds[0].innerHTML.lastIndexOf('>')).slice(1);

        localEnumData.parameterProps.push(propType);

      });

      this.enumData.push(localEnumData);
    }


  }

  async parseDataFiles() {

    /**
     * Read main file and get faults links
     */
    const indexFileData: Buffer = await readFile(__dirname + '/../source-sdk/index-do_types.html');

    const indexParsedHtml = parse(indexFileData.toString()) as HTMLElement & {
      valid: boolean;
    };

    // Get all links from file
    const links: HTMLElement[] = indexParsedHtml.querySelectorAll('a');

    const sourceFiles: string[] = [];

    links.forEach((link: HTMLElement) => {

      // Get only links that contains a title
      if (link.attributes.title && link.attributes.href) {

        const href: string = link.attributes.href;

        // Do not get links with a hash
        if (href.indexOf('#') !== -1) return;

        sourceFiles.push(href);
      }

    });

    // Remove all duplicates
    let uniqueSourceFiles: string[] = [...new Set(sourceFiles)];

    /**
     * Get data objects data from each file
     */
    for (const sourceFile of uniqueSourceFiles) {

      const dataFiledata: Buffer = await readFile(`${__dirname}/../source-sdk/${sourceFile}`);

      // Some <ul> tags are not closed, which leads to wrong parse and wrong result. Just remove <ul> & <li> tags...
      // Some <p> tags are not closed, which leads to wrong parse and wrong result. Just remove <p> tags...
      // Some <messageCatalogKeyPrefix> tags are used as description but it throws error as it can be considered html tag
      // Some <host> <port> tags are used as description but it throws error as it can be considered html tag vim.vApp.IpPool.html
      // Some <hostname> <uuid> tags are used as description but it throws error as it can be considered html tag vim.ServiceManager.ServiceInfo.html
      // Some <code> <false> tags are used as description but it throws error as it can be considered html tag vim.vm.device.VirtualSerialPort.PipeBackingInfo.html
      const dataParsedHtml = parse(dataFiledata.toString()
        .replace(/<\/ul>/g, '')
        .replace(/<ul>/g, '')
        .replace(/<\/li>/g, '')
        .replace(/<li>/g, '')
        .replace(/<port>/g, '')
        .replace(/<host>/g, '')
        .replace(/<code>/g, '')
        .replace(/<\/code>/g, '')
        .replace(/<false>/g, '')
        .replace(/<\/false>/g, '')
        .replace(/<hostname>/g, '')
        .replace(/<uuid>/g, '')
        .replace(/<messageCatalogKeyPrefix>/g, '')
        .replace(/<p( class="table-title")?>/g, '')
        .replace(/<\/p>/g, ''), {noFix: false}) as HTMLElement & {
        valid: boolean;
      };

      // Get fault type name
      const dataName: string = dataParsedHtml.querySelectorAll('h1').find((h1: HTMLElement) => {
        return h1.innerHTML.indexOf('Data Object -') !== -1;
      }).innerHTML.split('(')[0].replace('Data Object - ', '');

      // Check if extends another property
      let localExtends: string;
      const extendsType: HTMLElement[] = dataParsedHtml.querySelectorAll('dl');

      extendsType.forEach((et: HTMLElement) => {

        // Get Extends
        const regexe = /Extends<\/dt>\r?\n<dd>\r?\n<a href="[a-zA-Z\/\-\.0-9]*">([a-zA-Z]*)<\/a>/gs;
        let me;

        while ((me = regexe.exec(et.innerHTML)) !== null) {
          if (me.index === regexe.lastIndex) regexe.lastIndex++;

          localExtends = me[1];
        }
      });

      // Get all data object parameters
      const tables: HTMLElement[] = dataParsedHtml.querySelectorAll('table');

      const dataTable: HTMLElement = tables.find((table: HTMLElement) => {
        return table.querySelectorAll('tr')[0] && table.querySelectorAll('tr')[0].querySelectorAll('th').length === 3;
      });

      const localDataData: DataData = {
        h1: dataName,
        parameterTable: dataTable,
        parameterProps: [],
        extends: localExtends
      };

      // Extract properties from 'parameterTable'
      localDataData.parameterTable.querySelectorAll('tr').forEach((tr: HTMLElement, idx: number) => {

        // Dont want table head
        if (idx === 0) return;

        const tds: HTMLElement[] = tr.querySelectorAll('td');

        // Inherited props and some other data
        if (!tds[1]) return;

        let propType: string = tds[1].innerHTML.replace(/(<([^>]+)>)/ig, '').replace(/\r\n/g, '');

        // Special case for ManagedObjectReference
        if (propType.indexOf(' to a ') !== -1) propType = `ManagedObjectReference & { $type: '${propType.substring(propType.lastIndexOf(' ')).trim()}'; }`;

        localDataData.parameterProps.push({
          name: tds[0].innerHTML.replace(/(<([^>]+)>)/ig, ''),
          type: propType
        });

      });

      this.dataData.push(localDataData);
    }


  }

  replaceXsd(prop: string): string {
    if (prop.includes('xsd:int')) prop = prop.replace('xsd:int', 'xsd:number');
    if (prop.includes('xsd:long')) prop = prop.replace('xsd:long', 'xsd:number');
    if (prop.includes('xsd:byte')) prop = prop.replace('xsd:byte', 'xsd:number');
    if (prop.includes('xsd:float')) prop = prop.replace('xsd:float', 'xsd:number');
    if (prop.includes('xsd:short')) prop = prop.replace('xsd:short', 'xsd:number');
    if (prop.includes('xsd:double')) prop = prop.replace('xsd:double', 'xsd:any');
    if (prop.includes('xsd:dateTime')) prop = prop.replace('xsd:dateTime', 'xsd:string');
    if (prop.includes('xsd:base64Binary')) prop = prop.replace('xsd:base64Binary', 'xsd:string');
    if (prop.includes('xsd:anyType')) prop = prop.replace('xsd:anyType', 'xsd:any');

    return prop;
  }

  private async printResults() {

    /**
     * Write main files
     */
    if (pathExistsSync(`${__dirname}/../src/lib/types/methods-input.ts`)) await unlink(`${__dirname}/../src/lib/types/methods-input.ts`);
    if (pathExistsSync(`${__dirname}/../src/lib/types/methods-output.ts`)) await unlink(`${__dirname}/../src/lib/types/methods-output.ts`);

    await writeFile(`${__dirname}/../src/lib/types/methods.ts`, `export type VmwareSdkFunctions =\n`);
    await writeFile(`${__dirname}/../src/lib/types/methods-output.ts`, `import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';\n`);

    for (const data of this.methodsData) {
      const methodName: string = data.h1;

      // Write main files imports
      await writeFile(`${__dirname}/../src/lib/types/methods-input.ts`, `import {${methodName}} from './methods/${methodName.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()}';\n`, {flag: 'a'});
    }

    const allReturns: string[] = [];
    this.methodsData.forEach((data: MethodData) => {
      allReturns.push(...data.returns.map((item: string) => {
        if (item.indexOf('ManagedObjectReference') !== -1) return 'ManagedObjectReference';
        if (item.indexOf('[]') !== -1) return item.slice(0, -2);
        return item;
      }));
    });

    const allFaults: string[] = [];
    this.methodsData.forEach((data: MethodData) => {
      allFaults.push(...data.faults.map((item: string) => {
        if (item.indexOf('ManagedObjectReference') !== -1) return 'ManagedObjectReference';
        if (item.indexOf('[]') !== -1) return item.slice(0, -2);
        return item;
      }));
    });

    const uniqueReturns = [...new Set(allReturns.map((item: string) => {
      if (item.indexOf('ManagedObjectReference') !== -1) return 'ManagedObjectReference';
      if (item.indexOf('[]') !== -1) return item.slice(0, -2);
      return item;
    }))];

    const uniqueFaults = [...new Set(allFaults.map((item: string) => {
      if (item.indexOf('ManagedObjectReference') !== -1) return 'ManagedObjectReference';
      if (item.indexOf('[]') !== -1) return item.slice(0, -2);
      return item;
    }))];

    await writeFile(`${__dirname}/../src/lib/types/methods-output.ts`, `${uniqueReturns.map((prop: string) => {
      if (prop.includes('xsd:')) return;
      if (prop === 'None') return;

      return `import {${prop}} from '${this.dataData.filter(e => e.h1 === prop).length > 0 ? './data/' : this.enumData.filter(e => e.h1 === prop).length > 0 ? './enums/' : this.faultData.filter(e => e.h1 === prop).length > 0 ? './faults/' : './'}${prop.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()}';\n`;
    }).join('')}`, {flag: 'a'});

    await writeFile(`${__dirname}/../src/lib/types/methods-output.ts`, `${uniqueFaults.map((prop: string) => {
      if (prop.includes('xsd:')) return;

      return `import {${prop}} from '${this.dataData.filter(e => e.h1 === prop).length > 0 ? './data/' : this.enumData.filter(e => e.h1 === prop).length > 0 ? './enums/' : this.faultData.filter(e => e.h1 === prop).length > 0 ? './faults/' : './'}${prop.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()}';\n`;
    }).join('')}`, {flag: 'a'});

    await writeFile(`${__dirname}/../src/lib/types/methods-input.ts`, `\nexport type VmwareSdkFunctionsInput<Action> =\n`, {flag: 'a'});
    await writeFile(`${__dirname}/../src/lib/types/methods-output.ts`, `\nexport type VmwareSdkFunctionsOutput<Action> =\n`, {flag: 'a'});

    for (const [i, data] of this.methodsData.entries()) {
      const methodName: string = data.h1;

      if (i === this.methodsData.length - 1) {
        await writeFile(`${__dirname}/../src/lib/types/methods.ts`, `   '${methodName}';`, {flag: 'a'});
      } else {
        await writeFile(`${__dirname}/../src/lib/types/methods.ts`, `   '${methodName}' |\n`, {flag: 'a'});
      }

      await writeFile(`${__dirname}/../src/lib/types/methods-input.ts`, `  Action extends '${methodName}' ? ${methodName} :\n`, {flag: 'a'});

      data.returns.forEach((returnParam: string, index: number, array: string[]) => {
        array[index] = this.replaceXsd(returnParam);
      });

      data.faults.forEach((faultParam: string, index: number, array: string[]) => {
        array[index] = this.replaceXsd(faultParam);
      });

      await writeFile(`${__dirname}/../src/lib/types/methods-output.ts`, `  Action extends '${methodName}' ? BackendResponse & { status: 'ok'; data: ${data.returns.join(' | ').replace(/xsd:/, '').replace('None', 'void')} } | BackendResponse & { status: 'error'; data: ${[...new Set(data.faults.map(obj => obj))].join(' | ').replace(/xsd:/, '')} } :\n`, {flag: 'a'});
    }

    await writeFile(`${__dirname}/../src/lib/types/methods-input.ts`, `  never;`, {flag: 'a'});
    await writeFile(`${__dirname}/../src/lib/types/methods-output.ts`, `  never;`, {flag: 'a'});

    /**
     * Write method properties file
     */
    for (const data of this.methodsData) {
      const uniqueProperties = [...new Set(data.parameterProps.map((item: { name: string; type: string; }) => {
        if (item.type.indexOf('ManagedObjectReference') !== -1) return 'ManagedObjectReference';
        if (item.type.indexOf('[]') !== -1) return item.type.slice(0, -2);
        return item.type;
      }))];

      const methodName: string = data.h1;

      await writeFile(`${__dirname}/../src/lib/types/methods/${methodName.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()}.ts`,
        `${uniqueProperties.map((prop: string) => {
          if (prop.includes('xsd:')) return;
          if (prop === methodName) return;

          return `import {${prop}} from '${this.dataData.filter(e => e.h1 === prop).length > 0 ? '../data/' : this.enumData.filter(e => e.h1 === prop).length > 0 ? '../enums/' : this.faultData.filter(e => e.h1 === prop).length > 0 ? '../faults/' : './'}${prop.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()}';\n`;
        }).join('')}

export interface ${methodName} {
${
          data.parameterProps.map((prop: { name: string; type: string; }, index: number, arr: []) => {

            if (prop.type.includes('xsd:int')) prop.type = prop.type.replace('xsd:int', 'xsd:number');
            if (prop.type.includes('xsd:long')) prop.type = prop.type.replace('xsd:long', 'xsd:number');
            if (prop.type.includes('xsd:byte')) prop.type = prop.type.replace('xsd:byte', 'xsd:number');
            if (prop.type.includes('xsd:float')) prop.type = prop.type.replace('xsd:float', 'xsd:number');
            if (prop.type.includes('xsd:short')) prop.type = prop.type.replace('xsd:short', 'xsd:number');
            if (prop.type.includes('xsd:double')) prop.type = prop.type.replace('xsd:double', 'xsd:any');
            if (prop.type.includes('xsd:dateTime')) prop.type = prop.type.replace('xsd:dateTime', 'xsd:string');
            if (prop.type.includes('xsd:base64Binary')) prop.type = prop.type.replace('xsd:base64Binary', 'xsd:string');
            if (prop.type.includes('xsd:anyType')) prop.type = prop.type.replace('xsd:anyType', 'xsd:any');

            return `  ${prop.name.replace('*', '?').replace(' P', '')}: ${prop.type.replace('xsd:', '')};${arr.length - 1 === index ? '' : '\n'}`;

          }).join('')
        }
}`);

    }


    /**
     * Write faults properties file
     */
    for (const data of this.faultData) {
      const uniqueProperties = [...new Set(data.parameterProps.map((item: { name: string; type: string; }) => {
        if (item.type.indexOf('ManagedObjectReference') !== -1) return 'ManagedObjectReference';
        if (item.type.indexOf('[]') !== -1) return item.type.slice(0, -2);
        return item.type;
      }))];

      const faultName: string = data.h1;

      await writeFile(`${__dirname}/../src/lib/types/faults/${faultName.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()}.ts`,
        `${(data.extends ? `import {${data.extends}} from '${this.dataData.filter(e => e.h1 === data.extends).length > 0 ? '../data/' : this.enumData.filter(e => e.h1 === data.extends).length > 0 ? '../enums/' : './'}${data.extends.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()}';\n` : '')}
${uniqueProperties.map((prop: string) => {
          if (prop.includes('xsd:')) return;
          if (prop === faultName) return;
          if (data.extends && prop === data.extends) return;

          return `import {${prop}} from '${this.dataData.filter(e => e.h1 === prop).length > 0 ? '../data/' : this.enumData.filter(e => e.h1 === prop).length > 0 ? '../enums/' : './'}${prop.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()}';\n`;
        }).join('')}
export interface ${faultName}${data.extends ? ' extends ' + data.extends : ''} {
${data.parameterProps.map((prop: { name: string; type: string; }, index: number, arr: []) => {

          if (prop.type.includes('xsd:int')) prop.type = prop.type.replace('xsd:int', 'xsd:number');
          if (prop.type.includes('xsd:long')) prop.type = prop.type.replace('xsd:long', 'xsd:number');
          if (prop.type.includes('xsd:byte')) prop.type = prop.type.replace('xsd:byte', 'xsd:number');
          if (prop.type.includes('xsd:float')) prop.type = prop.type.replace('xsd:float', 'xsd:number');
          if (prop.type.includes('xsd:short')) prop.type = prop.type.replace('xsd:short', 'xsd:number');
          if (prop.type.includes('xsd:double')) prop.type = prop.type.replace('xsd:double', 'xsd:any');
          if (prop.type.includes('xsd:dateTime')) prop.type = prop.type.replace('xsd:dateTime', 'xsd:string');
          if (prop.type.includes('xsd:base64Binary')) prop.type = prop.type.replace('xsd:base64Binary', 'xsd:string');
          if (prop.type.includes('xsd:anyType')) prop.type = prop.type.replace('xsd:anyType', 'xsd:any');

          return `  ${prop.name.replace('*', '?').replace(' P', '')}: ${prop.type.replace('xsd:', '')};${arr.length - 1 === index ? '' : '\n'}`;

        }).join('')
        }
}`);

    }


    /**
     * Write enums properties file
     */
    for (const data of this.enumData) {

      const enumName: string = data.h1;

      await writeFile(`${__dirname}/../src/lib/types/enums/${enumName.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()}.ts`,
        `export type ${enumName} =
${data.parameterProps.map((prop: string, index: number, arr: []) => {
          if (index === arr.length - 1) return `  '${prop}';`;
          return `  '${prop}' |\n`;
        }).join('')}`);

    }


    /**
     * Write data objects properties file
     */
    for (const data of this.dataData) {
      const uniqueProperties = [...new Set(data.parameterProps.map((item: { name: string; type: string; }) => {
        if (item.type.indexOf('ManagedObjectReference') !== -1) return 'ManagedObjectReference';
        if (item.type.indexOf('[]') !== -1) return item.type.slice(0, -2);
        return item.type;
      }))];

      const dataName: string = data.h1;

      await writeFile(`${__dirname}/../src/lib/types/data/${dataName.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()}.ts`,
        `${(data.extends ? `import {${data.extends}} from '${this.faultData.filter(e => e.h1 === data.extends).length > 0 ? '../faults/' : this.enumData.filter(e => e.h1 === data.extends).length > 0 ? '../enums/' : './'}${data.extends.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()}';\n` : '')}
${uniqueProperties.map((prop: string) => {
          if (prop.includes('xsd:')) return;
          if (prop === dataName) return;
          if (data.extends && prop === data.extends) return;

          return `import {${prop}} from '${this.faultData.filter(e => e.h1 === prop).length > 0 ? '../faults/' : this.enumData.filter(e => e.h1 === prop).length > 0 ? '../enums/' : './'}${prop.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()}';\n`;
        }).join('')}
export interface ${dataName}${data.extends ? ' extends ' + data.extends : ''} {
${data.parameterProps.map((prop: { name: string; type: string; }, index: number, arr: []) => {

          if (prop.type.includes('xsd:int')) prop.type = prop.type.replace('xsd:int', 'xsd:number');
          if (prop.type.includes('xsd:long')) prop.type = prop.type.replace('xsd:long', 'xsd:number');
          if (prop.type.includes('xsd:byte')) prop.type = prop.type.replace('xsd:byte', 'xsd:number');
          if (prop.type.includes('xsd:float')) prop.type = prop.type.replace('xsd:float', 'xsd:number');
          if (prop.type.includes('xsd:short')) prop.type = prop.type.replace('xsd:short', 'xsd:number');
          if (prop.type.includes('xsd:double')) prop.type = prop.type.replace('xsd:double', 'xsd:any');
          if (prop.type.includes('xsd:dateTime')) prop.type = prop.type.replace('xsd:dateTime', 'xsd:string');
          if (prop.type.includes('xsd:base64Binary')) prop.type = prop.type.replace('xsd:base64Binary', 'xsd:string');
          if (prop.type.includes('xsd:anyType')) prop.type = prop.type.replace('xsd:anyType', 'xsd:any');

          return `  ${prop.name.replace('*', '?').replace(' P', '')}: ${prop.type.replace('xsd:', '')};${arr.length - 1 === index ? '' : '\n'}`;

        }).join('')
        }
}`);

    }

    // Special case
    await writeFile(`${__dirname}/../src/lib/types/data/managed-object-reference.ts`,
      `export interface ManagedObjectReference {
      $type:
        'Alarm' |
        'AlarmManager' |
        'AuthorizationManager' |
        'CertificateManager' |
        'ClusterComputeResource' |
        'ClusterEVCManager' |
        'ClusterProfile' |
        'ClusterProfileManager' |
        'ComputeResource' |
        'ContainerView' |
        'CryptoManager' |
        'CryptoManagerHost' |
        'CryptoManagerHostKMS' |
        'CryptoManagerKmip' |
        'CustomFieldsManager' |
        'CustomizationSpecManager' |
        'Datacenter' |
        'Datastore' |
        'DatastoreNamespaceManager' |
        'DiagnosticManager' |
        'DistributedVirtualPortgroup' |
        'DistributedVirtualSwitch' |
        'DistributedVirtualSwitchManager' |
        'EnvironmentBrowser' |
        'EventHistoryCollector' |
        'EventManager' |
        'ExtensibleManagedObject' |
        'ExtensionManager' |
        'FailoverClusterConfigurator' |
        'FailoverClusterManager' |
        'FileManager' |
        'Folder' |
        'GuestAliasManager' |
        'GuestAuthManager' |
        'GuestFileManager' |
        'GuestOperationsManager' |
        'GuestProcessManager' |
        'GuestWindowsRegistryManager' |
        'HealthUpdateManager' |
        'HistoryCollector' |
        'HostAccessManager' |
        'HostActiveDirectoryAuthentication' |
        'HostAuthenticationManager' |
        'HostAuthenticationStore' |
        'HostAutoStartManager' |
        'HostBootDeviceSystem' |
        'HostCacheConfigurationManager' |
        'HostCertificateManager' |
        'HostCpuSchedulerSystem' |
        'HostDatastoreBrowser' |
        'HostDatastoreSystem' |
        'HostDateTimeSystem' |
        'HostDiagnosticSystem' |
        'HostDirectoryStore' |
        'HostEsxAgentHostManager' |
        'HostFirewallSystem' |
        'HostFirmwareSystem' |
        'HostGraphicsManager' |
        'HostHealthStatusSystem' |
        'HostImageConfigManager' |
        'HostKernelModuleSystem' |
        'HostLocalAccountManager' |
        'HostLocalAuthentication' |
        'HostMemorySystem' |
        'HostNetworkSystem' |
        'HostNvdimmSystem' |
        'HostPatchManager' |
        'HostPciPassthruSystem' |
        'HostPowerSystem' |
        'HostProfile' |
        'HostProfileManager' |
        'HostServiceSystem' |
        'HostSnmpSystem' |
        'HostSpecificationManager' |
        'HostStorageSystem' |
        'HostSystem' |
        'HostVFlashManager' |
        'HostVirtualNicManager' |
        'HostVMotionSystem' |
        'HostVsanInternalSystem' |
        'HostVsanSystem' |
        'HostVStorageObjectManager' |
        'HttpNfcLease' |
        'InventoryView' |
        'IoFilterManager' |
        'IpPoolManager' |
        'IscsiManager' |
        'LicenseAssignmentManager' |
        'LicenseManager' |
        'ListView' |
        'LocalizationManager' |
        'ManagedEntity' |
        'ManagedObjectView' |
        'MessageBusProxy' |
        'Network' |
        'OpaqueNetwork' |
        'OptionManager' |
        'OverheadMemoryManager' |
        'OvfManager' |
        'PerformanceManager' |
        'Profile' |
        'ProfileComplianceManager' |
        'ProfileManager' |
        'PropertyCollector' |
        'PropertyFilter' |
        'ResourcePlanningManager' |
        'ResourcePool' |
        'ScheduledTask' |
        'ScheduledTaskManager' |
        'SearchIndex' |
        'ServiceInstance' |
        'ServiceManager' |
        'SessionManager' |
        'SimpleCommand' |
        'StoragePod' |
        'StorageResourceManager' |
        'Task' |
        'TaskHistoryCollector' |
        'TaskManager' |
        'UserDirectory' |
        'VcenterVStorageObjectManager' |
        'View' |
        'ViewManager' |
        'VirtualApp' |
        'VirtualDiskManager' |
        'VirtualizationManager' |
        'VirtualMachine' |
        'VirtualMachineCompatibilityChecker' |
        'VirtualMachineProvisioningChecker' |
        'VirtualMachineSnapshot' |
        'VmwareDistributedVirtualSwitch' |
        'VsanUpgradeSystem' |
        'VStorageObjectManagerBase';
      _value: string;
    }`);

  }

}

new Init().init();
