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

const projectInOrder = [
  'anyopsos-app-credentials-manager',
  'anyopsos-app-infrastructure-manager'
];

(async function main() {

  // Build projects in order
  for (const project of projectInOrder) {
    let child = spawn('npm.cmd', ['run', 'ng', 'build', project]);

    await onExit(child);
  }

  // Build others
  fs.readFile('angular.json', 'utf8', async (err, data) => {
    const ngCli = JSON.parse(data);

    for (const project of Object.keys(ngCli.projects)) {

      // Perform build operation only on libraries not already built
      if (!project.startsWith('anyopsos-app-')) continue;
      if (projectInOrder.includes(project)) continue;

      let child = spawn('npm.cmd', ['run', 'ng', 'build', project]);

      await onExit(child);
    }

  });
})();
