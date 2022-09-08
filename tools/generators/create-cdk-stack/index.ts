import {
  Tree,
  formatFiles,
  installPackagesTask,
  readProjectConfiguration,
  generateFiles,
  joinPathFragments,
  names,
  updateProjectConfiguration,
} from '@nrwl/devkit';

import { applicationGenerator } from '@nrwl/node';

export default async function (tree: Tree, schema: any) {
  await applicationGenerator(tree, { name: schema.name });

  const project = readProjectConfiguration(tree, schema.name);

  generateFiles(
    tree, // the virtual file system

    joinPathFragments(__dirname, './files'), // path to the file templates

    project.root, // destination path of the files

    {
      ...schema,
      ...names(schema.name),
      // offsetFromRoot: offsetFromRoot(
      //   readProjectConfiguration(tree, schema.name).root
      // ),
      template: '',
    }
  );

  updateProjectConfiguration(tree, schema.name, {
    ...project,
    targets: {
      ...project.targets,

      build: {
        executor: '@nrwl/node:webpack',
        outputs: ['{options.outputPath}'],
        options: {
          // TODO: update relative path
          main: `apps/${schema.name}/src/main.ts`,

          // TODO: update relative path
          outputPath: `apps/${schema.name}/dist`,

          // TODO: update relative path
          tsConfig: `apps/${schema.name}/tsconfig.app.json`,
          assets: [`apps/${schema.name}/src/assets`],
        },
        configurations: {
          outputPath: `./dist/apps/${schema.name}`,
          production: {
            optimization: true,
            extractLicenses: true,
            inspect: false,
            fileReplacements: [
              {
                replace: `apps/${schema.name}/src/environments/environment.ts`,
                with: `apps/${schema.name}/src/environments/environment.prod.ts`,
              },
            ],
          },
        },
      },

      // TODO:
      // bootstrap: {
      //   executor: './tools/executors/cdk-bootstrap:cdk-bootstrap',
      //   options: {
      //     main: `apps/${schema.name}/dist/main.js`,
      //     outputPath: `apps/${schema.name}/cdk.out`,
      //   },
      // },

      synth: {
        executor: './tools/executors/cdk-synth:cdk-synth',
        options: {
          main: `apps/${schema.name}/dist/main.js`,
          outputPath: `apps/${schema.name}/cdk.out`,
        },
      },

      deploy: {
        executor: './tools/executors/cdk-deploy:cdk-deploy',
        options: {
          main: `apps/${schema.name}/dist/main.js`,
          outputPath: `apps/${schema.name}/cdk.out`,
        },
      },
    },
  });

  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
  };
}
