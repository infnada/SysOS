const download = require('download-git-repo');

download('netdata/netdata', 'node_modules/netdata', function (err) {
  console.log(err ? 'Error' : 'Success')
});
