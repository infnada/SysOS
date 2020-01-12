import 'reflect-metadata';

import awaitSpawn from 'await-spawn';
const moduleAlias = require('module-alias');
moduleAlias.addAlias('@anyopsos', `${__dirname}/../../../dist/anyOpsOS/filesystem/bin/modules/`);

import {getFromContainer, MetadataStorage} from 'class-validator';
import {validationMetadatasToSchemas} from 'class-validator-jsonschema';
import {createExpressServer, getMetadataArgsStorage} from 'routing-controllers';
import {routingControllersToSpec} from 'routing-controllers-openapi';
import {writeJson} from 'fs-extra';
import * as Converter from 'api-spec-converter';

const routingControllersOptions = {
  controllers: [`${__dirname}/../../../dist/apis/*/lib/*.js`]
};
createExpressServer(routingControllersOptions);

// Parse class-validator classes into JSON Schema:
const metadatas = (getFromContainer(MetadataStorage) as any).validationMetadatas;
const schemas = validationMetadatasToSchemas(metadatas, {
  refPointerPrefix: '#/components/schemas/'
});

// Parse routing-controllers classes into OpenAPI spec:
const storage = getMetadataArgsStorage();
const spec = routingControllersToSpec(storage, routingControllersOptions, {
  components: {
    schemas,
    securitySchemes: {
      basicAuth: {
        scheme: 'basic',
        type: 'http'
      }
    }
  },
  info: {
    description: 'Generated with `routing-controllers-openapi`',
    title: 'A sample API',
    version: '1.0.0'
  }
});

Converter.convert({
  from: 'openapi_3',
  to: 'swagger_2',
  source: spec,
}).then(async (converted): Promise<void> => {
  await writeJson(
    `${__dirname}/../../../projects/apis/swagger.json`,
    converted.spec,
    {spaces: 2}
  );

  // Generate one swagger file per api project
  const projects = [];

  Object.keys(converted.spec.paths).map((path: string) => {

    const projectName = path.split('/')[2];

    if (!projects[projectName]) {
      projects[projectName] = {
        info: {
          title: 'A sample API',
          version: '1.0.0',
          description: 'Generated with `routing-controllers-openapi`'
        },
        swagger: '2.0',
        projectName,
        paths: {}
      };
    }

    projects[projectName].paths = {...projects[projectName].paths, [path]: converted.spec.paths[path]};
  });

  await Promise.all(
    Object.keys(projects).map(async (project): Promise<void> => {
      await writeJson(
        `${__dirname}/../../../projects/apis/${projects[project].projectName}/swagger.json`,
        projects[project],
        {spaces: 2}
      );

      await awaitSpawn('swagger-markdown.cmd', ['--input', `${__dirname}/../../../projects/apis/${projects[project].projectName}/swagger.json`, '--output', `${__dirname}/../../../projects/apis/${projects[project].projectName}/README.md`], {
        cwd: `${__dirname}/../../`,
        stdio: 'inherit'
      });
    })
  );

  console.log('Finish generate APIS swagger.json');
});
