const fs = require('fs');
const download = require('download-git-repo');
const editJsonFile = require('edit-json-file');

if (!fs.existsSync('node_modules/netdata_downloaded')) {
  console.log('Downloading netdata');

  download('netdata/netdata', 'node_modules/netdata_downloaded', function (err) {
    console.log(err ? 'Error' : 'Success');

    let packageFile = editJsonFile('node_modules/netdata_downloaded/package.json');
    packageFile.set('version', '1.0.0');
    packageFile.save();
  });
}
