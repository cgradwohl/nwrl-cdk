# Happynrwl

### Prerequisites

- AWS CDK
- AWS CLI
- node.js/ npm

## Getting Started

0. You will need to bootstrap the CDK to your environment. Please follow the instructions here: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html. Once you have bootstrapped a service in this repo, you will not have to bootstrap for subsequent services. (see TODOs below)

1. Run `npx nx workspace-generator create-cdk-stack [service name]` to generate a new CDK Stack. This is an example of a custom generator in nx.

2. Run `npx nx run [service name]:build` to run the TS compiler and build the stack to its respective `/dist` folder

3. Run `npx nx run [service name]:synth` to synthesize the CDK to Cloud Formation. This is an example of a custom executor in nx.

4. Run `npx nx run [service name]:deploy` to deploy the service. This is an example of a custom executor in nx.

5. Run `npx nx print-affected --target=build --select=projects` to see a list of projects that have changed since the last commit. This functionality can be extended in a Github Action so that only the latest stacks get deployed.

## TODOs

- [] build a custom executor to bootstrap the cdk to a dev environment
- [] custom generator tasks: ensure that the bootstrapQualifier is required in cdk.json: https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping.html
- [] add test scaffolding to the `create-cdk-stack` generator.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Developing Nx Custom Executors

When developing a custom executor, you will need to compile it for use with nx.
Run `npx tsc tools/executors/[executor]/impl` to compile TS --> JS.
