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
  'sysos-lib-logger',
  'sysos-lib-file-system',
  'sysos-lib-application',
  'sysos-lib-modal',
  'sysos-lib-netapp',
  'sysos-lib-selectable',
  'sysos-lib-types',
  'sysos-lib-user',
  'sysos-lib-vmware',
  'sysos-lib-file-system-ui',
  'sysos-lib-file',
  'sysos-lib-folder',
  'sysos-lib-service-injector',
  'sysos-lib-scroll-spy',
  'sysos-lib-sanitize'
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
      if (!project.startsWith('sysos-lib-')) continue;
      if (projectInOrder.includes(project)) continue;

      let child = spawn('npm.cmd', ['run', 'ng', 'build', project]);

      await onExit(child);
    }

  });
})();
