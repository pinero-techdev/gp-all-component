# GpAllComponent

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.0.

## Code scaffolding

Run `ng generate component component-name --project gp-all-component` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project gp-all-component`.

> Note: Don't forget to add `--project gp-all-component` or else it will be added to the default project in your `angular.json` file.

## Build

Run `ng build gp-all-component` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build gp-all-component`, go to the dist folder `cd dist/gp-all-component` and run `npm publish`.

## Running unit tests

Run `ng test gp-all-component` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Development

Follow steps below to setup the development environment for gp-all-component:

### Manual Compile Approach

1. From the project root, run `npm i` to install the dependencies
2. Made the changes to the library as you need
3. Run `npm run build` to compile project, and when it finishes you'll find a .tgz file located in dist/gp-all-component, which you can use to install the library in the consuming app.

### Automatic Changes Preview

0. For Windows users, you can skip up to step 5
1. Only for Mac users, you may need to install [nvm](https://github.com/nvm-sh/nvm) if you don't have it already
2. With nvm available, install node version 10.15.3 with `nvm install 10.15.3`
3. Make it the default node version `nvm alias default 10.15.3`
4. Close the command line, and open it again to reload node path
5. Start the build angular process in watch mode with `npm run build:watch`
6. When build has finished and waiting for file changes, go into the dist/gp-all-component directory and run `npm link`
7. The library is ready to consume with live preview by setting up in the external application you want to preview the changes with `npm link gp-all-component`
8. In case you have any `critical dependency` errors, you may need to config your `tsconfig.json` file with the following paths in compiler options:

```json
"paths": {
            "*": ["types/*"],
            "@angular/*": ["node_modules/@angular/*"],
            "rxjs": ["node_modules/rxjs"],
            "rxjs-compat": ["node_modules/rxjs-compat"],
            "primeng": ["node_modules/primeng"],
            "primeicons": ["node_modules/primeicons"],
            "primeflex": ["node_modules/primeflex"],
            "moment": ["node_modules/moment"]
        }
```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
