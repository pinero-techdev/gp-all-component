np# Gp All Component #

## 1. About

GP All Component is a library of components for building projects in Grupo Piñero. The purpose of this library is joining the common components and in an easy way to pick up and integrate them in other projects. 

The library was made in Angular 7.2.0, if you’d like to learn more about how the GpAllComponent should be used, we created a sample project. 

## 2. Building the library

If you want to consume this library with your own applications, you may first build it for production. In order to do so, follow next instructions to learn how to do it. 

First please make sure you met the requirements as listed in step 2, and install all the library dependencies by running `npm install` 

You are now able to run command `npm run build` from project root directory (at the same level where the general package.json). 

After it has finished building the library, you’ll find the compiled target in the dist folder, where you’ll also notice there’s it has generated a tgz file. You can use this file to install the library in your own applications by installing it from that application (not inside the library) with command `npm i absolute/path/to/file.tgz` where the path must be an absolute path (not relative) to where the tgz file is located. 

## 3. Development

In the following section we’ll explain how you can setup the development environment to be able to make modifications to the library in order to fix any issue or extend its functionality. The easiest way is the manual comile approach, but it might become a bit repetitive over the time, so there’s an alternative way to live reload all the changes you are making using npm link. You are free to choose the approach you like the most. 
 
### Manual Compile Approach 

1. From the project root, run `npm i` to install the dependencies 

2. Made the changes to the library as you need 

3. Run `npm run build` to compile project, and when it finishes, you'll find a .tgz file located in dist/gp-all-component, which you can use to install the library in the app you want to use it with command `npm i absolute/path/to/file.tgz` where the path must be an absolute path (not relative) to where the tgz file is located. 

### Automatic Changes Preview 

You can also setup the project to be able to live reload all the changes you made to the library, but that needs just a bit of extra configuration steps. 

0. For Windows users, you can skip up to step 5 

1. Only for Mac users, there might be permissions issues, so you may need to install nvm (if you don’t have a node version manager already) to overcome them, instructions here: https://github.com/nvm-sh/nvm 

2. With nvm available, install node version 10.15.3 with `nvm install 10.15.3` 

3. Make it the default node version `nvm alias default 10.15.3` 

4. Close the command line, and open it again to reload node path 

5. Start the build angular process in watch mode with `npm run build:watch` 

6. When build has finished and waiting for file changes, go into the dist/gp-all-component directory and run `npm link` 

7. The library is ready to consume with live preview by running the following command from the external application root directory: `npm link gp-all-component` 

#### Common Issues with NPM Link

##### Library Styles

To be able to see the library styles while working with npm link, you need to include the following import in the general `styles.scss` instead of doing it from the angular.json as specified in step 9:

```scss
@import '../node_modules/gp-all-component/lib/resources/scss/main.scss';
```

> ⚠️ Make sure you remember to revert the previous step whenever you are going to commit something!

Currently there is not a better way to solve this, as seen in the following thread: https://github.com/angular/angular-cli/issues/3500

##### Critical Dependency Error

In case you have any `critical dependency` errors, you may need to config your `tsconfig.json` file with the following paths in compiler options: 
 

``` 

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

##### Permission Access Error (Windows)

For Windows users, if anytime you find an “EACCESS: Permission Access Error”, and you are unable to delete the dist folder, you can follow next steps to delete it: 

Press WIN + R in keyboard to run command 

Execute `runas /user:User cmd` where User may be replaced with your computer local user name 

Once executed, from the cmd you’ve just opened, browse to the project directory 

Once there, run `RD /S /Q "dist"` where `dist` is the path to the dist folder 

Once you’ve done this, the dist folder should have been deleted successfully, and you now would be able to execute `npm run build:watch` again as usually. 

## 4. Code scaffolding

Run `ng generate component component-name --project gp-all-component` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project gp-all-component`.

> Note: Don't forget to add `--project gp-all-component` or else it will be added to the default project in your `angular.json` file.

## 5. Build & package ##

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## 6. Running unit tests

Run `ng t gp-all-component` to execute the unit tests via [Karma](https://karma-runner.github.io).

## 7. Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## 8. Deploy ##

### Versioned (Recommended)
 Run prebuild commands to versioning the package. 
 If you introduce fixes or similar use: `npm run prebuild:patch` 
 If you introduce minor changes or simple features use: `npm run prebuild:minor` 
 If you introduce a change that breaks a package dependency use: `npm run prebuild:major` 

### Unversioned (not recommended)
Run `npm run build` to execute the building and packing the app. Then to deploy you should run the script `npm run deploy-component`.

## 9. Dependencies ##
You should have Node.js 10.15.3v or upgrade.

Next dependencies are needed for the correct working of the library. The dependencies required are: PrimeNG, Quill, Moment.js.

### PrimeNG ###
+ Install PrimeNg, PrimeIcons and Angular animations.
```
    npm install primeng primeicons @angular/animations @angular/cdk primeflex rxjs-compat --save
```
+ Add PrimeNG and Prime css to styles in angular.json.
```
  "styles": [
    "node_modules/primeng/resources/primeng.min.css",
    "node_modules/primeicons/primeicons.css",
    "node_modules/primeflex/primeflex.css",
    "node_modules/primeng/resources/themes/nova-light/theme.css"
  ]
```
+ You need to import BrowserAnimationsModule to your application. If you prefer to disable animations globally, _import NoopAnimationsModule_ instead.
```
    @NgModule({
        imports: [
            BrowserModule,
            BrowserAnimationsModule,
            //...
        ],
        //...
    })
```
### Quill Editor 1.0. ###
Quill is a dependency of PrimeNG

+ Install Quill.

```
    npm install quill --save
```
+ Add Quill to scripts in angular.json.

```
    "scripts": ["node_modules/quill/dist/quill.js"]
```

+ Add Quill css to styles in angular.json.

```
"styles": [
    "node_modules/quill/dist/quill.core.css",
    "node_modules/quill/dist/quill.snow.css"
]
```

### Moment.js ###

+ First you need to install the npm module:

```
npm install moment --save
```


+ If you need more help check out the [Moment.js Documentation](https://momentjs.com/)


And the styles for the library:

### Main Scss ###
+ Add the main's styles in your angular.json located in the root folder.
```
"styles": [
    ...
    "node_modules/gp-all-component/lib/resources/scss/main.scss"
    ...
  ]
```

> ⚠️ If you are working with npm link, the import above won't work. Please review step 3 "Library Styles" for a solution for this. You can safely ignore this warning if you work with tgz or other alternatives, this issue only happens with npm link


## Errors fixes ##
On version 6+ of Angular CLI the shim for global and other node built-ins is removed. You could have this error on your console log:

```
    index.js:43 Uncaught ReferenceError: global is not defined<br>
    at Object../node_modules/buffer/index.js (index.js:43)<br>
    at __webpack_require__ (bootstrap:78)<br>
    at Module../node_modules/gp-all-component/fesm5/gp-all-component.js (gp-all-component.js:1)<br>
    at __webpack_require__ (bootstrap:78)<br>
    at Object../src/app/app.module.ts (app.module.ts:1)<br>
    at __webpack_require__ (bootstrap:78)<br>
    at Object../src/main.ts (main.ts:4)<br>
    at __webpack_require__ (bootstrap:78)<br>
    at Object.0 (main.ts:12)<br>
    at __webpack_require__ (bootstrap:78)<br>
```
<br>

#### Solution ####
Adding this line to polyfills.ts should resolve node global error.

```
(window as any).global = window;
```

The solution was mentioned in this [angular-cli issue thread](https://github.com/angular/angular-cli/issues/9827).

## 10. Further help ###
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
