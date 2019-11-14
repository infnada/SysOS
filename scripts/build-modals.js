const fs = require('fs');
const spawn = require('child_process').spawn;

function onExit(child) {
  return new Promise((resolve, reject) => {
    child.stdout.on('data', (data) => process.stdout.write(data.toString()));
    child.stderr.on('data', (data) => process.stdout.write(data.toString()));
    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(process.exit(code));
      }
    });
  });
}

fs.readFile('angular.json', 'utf8', async (err, data) => {
  const ngCli = JSON.parse(data);

  for (const project of Object.keys(ngCli.projects)) {

    // Perform build operation only on libraries
    if (!project.startsWith('anyopsos-modal-')) continue;

    let child = spawn('npm.cmd', ['run', 'ng', 'build', project]);

    await onExit(child);
  }

});
