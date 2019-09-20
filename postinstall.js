const download = require('download-git-repo');

download('netdata/netdata', 'node_modules/netdata', function (err) {
  console.log(err ? 'Error' : 'Success')
});

download('jgraph/mxgraph', 'node_modules/mxgraph_dl', function (err) {
  console.log(err ? 'Error' : 'Success')
});
