const fs = require('fs');
const request = require('request');
const headers = {
  'origin': 'https://code.vmware.com',
  'x-requested-with': 'XMLHttpRequest',
  'pragma': 'no-cache',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36',
  'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'accept': '*/*',
  'cache-control': 'no-cache',
  'authority': 'code.vmware.com',
  'referer': 'https://code.vmware.com/apis/358/vsphere'
};

const dataString = '_apiexplorer_WAR_dpportlet_artifactId=6647&_apiexplorer_WAR_dpportlet_url=%2Fdoc%2Findex-faults.html&_apiexplorer_WAR_dpportlet_docToken=null';

// Get All types
request.post({
  headers: headers,
  url:     'https://code.vmware.com/explorer-apis?p_p_id=apiexplorer_WAR_dpportlet&p_p_lifecycle=2&p_p_state=normal&p_p_mode=view&p_p_cacheability=cacheLevelPage&p_p_col_id=column-1&p_p_col_count=1',
  body:    dataString,
}, function(error, response, body){
  let startIter = 1;
  let startIterReal = 1;

  // Get all links to all types
  const regex = /(?:ht|f)tps?:\/\/[-a-zA-Z0-9.]+\.[a-zA-Z]{2,3}(?:\/(?:[^'<=]|=)*)?/g;
  let m;

  while ((m = regex.exec(body)) !== null) {
    if (m.index === regex.lastIndex) regex.lastIndex++;


    // For each type:
    m.forEach((match, groupIndex) => {
      if (match.includes('index-faults.html#')) return;
      if (match.includes('index-e_types.html#')) return;
      if (match.includes('index-do_types.html#')) return;
      if (match.includes('index-all_types.html#')) return;
      startIter++;

      if (startIter < 0) return;
      if (startIter >= 0) {
        startIterReal++;
      }

      setTimeout(function timer () {
        if (match.includes('index-faults.html#')) return;
        if (match.includes('index-e_types.html#')) return;
        if (match.includes('index-do_types.html#')) return;
        if (match.includes('index-all_types.html#')) return;
        console.log(`${startIter} - ${match.substring(match.lastIndexOf('/') + 1)} - ${match}`);

        let typeType;
        let typeName;
        let fileName;
        let extendsType;
        let fileContent;
        let properties = [];
        let enums = [];
        const dataStringChild = '_apiexplorer_WAR_dpportlet_artifactId=6647&_apiexplorer_WAR_dpportlet_url=%2Fdoc%2F' + match.substring(match.lastIndexOf('/') + 1) + '&_apiexplorer_WAR_dpportlet_docToken=null';
        request.post({
          headers: headers,
          url: 'https://code.vmware.com/explorer-apis?p_p_id=apiexplorer_WAR_dpportlet&p_p_lifecycle=2&p_p_state=normal&p_p_mode=view&p_p_cacheability=cacheLevelPage&p_p_col_id=column-1&p_p_col_count=1',
          body: dataStringChild
        }, function (error, response, bodyChild) {

          // Get Type Name
          const regexn = /<h1>(Data Object|Enum|Fault) - (.*)\(.*/g;
          let mn;

          while ((mn = regexn.exec(bodyChild)) !== null) {
            if (mn.index === regexn.lastIndex) regexn.lastIndex++;

            typeType = mn[1];
            typeName = mn[2];
          }

          fileName = typeName.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase() + '.ts';
          if (fs.existsSync(fileName)) return console.log(fileName + ' already exists');
          /**
           * IS ENUM
           */
          if (typeType === 'Enum') {
            const regexe = /<tr class='[a-zA-Z0-9_]*'>.\s\s\s\s\s\s<td><span.*<\/span>([a-zA-Z0-9_]*)/g;
            let me;

            while ((me = regexe.exec(bodyChild)) !== null) {
              // This is necessary to avoid infinite loops with zero-width matches
              if (me.index === regexe.lastIndex) me.lastIndex++;

              enums.push(me[1]);
            }

fileContent = `export type ${typeName} = ${enums.map((prop, idx, array) => {
  if (idx === array.length - 1) return `'${prop}';`;
  return `'${prop}' | `;
}).join('')}`;

            /**
             * NOT ENUM
             */
          } else {
            // Get Extends
            const regexe = /Extends.\s\s\s\s<\/dt>.\s\s\s\s<dd>.\s\s\s\s\s<a href='https:[a-zA-Z\/\-\.0-9]*' class=' external' target='_blank' rel='noopener'>([a-zA-Z]*)<\/a>/gs;
            let me;

            while ((me = regexe.exec(bodyChild)) !== null) {
              if (me.index === regexe.lastIndex) regexe.lastIndex++;

              extendsType = me[1];
            }

            // Get properties
            const regexp = /<td nowrap='1'><span [a-zA-Z0-9'=<>\/\s]*<strong>([a-zA-Z]*)<\/strong>([a-zA-Z0-9<>\/:'=\-\s]*(\*)[a-zA-Z0-9<>\/:'=\-\s]*)*<\/td>.\s*<td>(<a href='[a-zA-Z0-9\/:.'=*-_]*' class=' external' target='_blank' rel='noopener'>([a-zA-Z:\[\]]*)(<\/a> <br \/> to a <a href='[a-zA-Z0-9\/:.'=*-_]*' class=' external' target='_blank' rel='noopener'>([a-zA-Z:\[\]]*))?<\/a>|([a-zA-Z:\[\]]*))<\/td>.\s\s\s\s\s\s<td>/g;
            let mp;

            while ((mp = regexp.exec(bodyChild)) !== null) {
              // This is necessary to avoid infinite loops with zero-width matches
              if (mp.index === regexp.lastIndex) regexp.lastIndex++;

              properties.push({
                name: (mp[3] ? mp[1] + '?' : mp[1]),
                type: (mp[7] ? `${mp[5]} & { $type: '${mp[7]}' }` : mp[8] ? mp[8] : mp[5])
              });

            }

            // Set file content
            const uniqueProperties = [...new Set(properties.map(item => item.type))];
fileContent = `${(extendsType ? `import {${extendsType}} from './${extendsType.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()}';\n` : '')}
${uniqueProperties.map((prop, idx, array) => {
  return `${
    (!prop.includes('xsd:') ? `import {${
      (prop.includes('[') ? prop.substr(0, prop.indexOf('[')) :
          (prop.includes(' ') ? prop.substr(0, prop.indexOf(' ')) :
              prop
          )
      )
      }} from './${
      (prop.includes('[') ? prop.substr(0, prop.indexOf('[')).replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase() :
          (prop.includes(' ') ? prop.substr(0, prop.indexOf(' ')).replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase() :
              prop.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()
          )
      )

      }';\n` : '')}`;
}).join('')}export interface ${typeName}${(extendsType ? ' extends ' + extendsType : '')} {
${properties.map((prop, idx, array) => {
if (idx === array.length - 1) return `  ${prop.name}: ${prop.type.replace('xsd:', '')};`;
return `  ${prop.name}: ${prop.type.replace('xsd:', '')};\n`;
}).join('')}
}
`;
          }


          fs.appendFile(fileName, fileContent, function (e) {
            if (e) console.log(e);
          });


          //console.log(typeName);
          //console.log(fileName);
          //console.log(extendsType);
          console.log(fileContent);
          //console.log(properties);

        });
      }, startIterReal*12000 );
    });
  }
});
