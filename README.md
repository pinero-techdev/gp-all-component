# GpAllComponent

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Dependencies

### PrimeNG
- Install PrimeNg, PrimeIcons and Angular animations.
```
    npm install primeng primeicons @angular/animations @angular/cdk primeflex --save
```
- Add PrimeNG and PrimeIcons css to styles in angular.json.
```
  "styles": [
    "node_modules/primeng/resources/primeng.min.css",
    "node_modules/primeicons/primeicons.css",
    "node_modules/primeflex/primeflex.css",
    "node_modules/primeng/resources/themes/nova-light/theme.css"
  ]
```
- You need to import BrowserAnimationsModule to your application. If you prefer to disable animations globally, _import NoopAnimationsModule_ instead.
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
### Quill Editor 1.0.
- Install Quill.
```
    npm install quill --save
```
- Add Quill to scripts in angular.json.
```
    "scripts": ["node_modules/quill/dist/quill.js"]
```
- Add Quill css to styles in angular.json.
```
"styles": [
    "node_modules/quill/dist/quill.core.css", 
    "node_modules/quill/dist/quill.snow.css"
]
```

### Moment.js ###
<ul>
    <li>
        First you need to install the npm module:<br>
        <code>npm install moment --save</code>
    </li>
    <li>
        If you need more help check out the [Moment.js Documentation](https://momentjs.com/)
    </li>
</ul>

## Further help ###
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Errors fixes ##
<p>On version 6+ of Angular CLI the shim for global and other node built-ins is removed. You could have this error on your console log:</p>
<code>
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
</code>
<br>

#### Solution ####
<p>Adding this line to polyfills.ts should resolve node global error.</p>

```(window as any).global = window;```

The solution was mentioned in this [angular-cli issue thread](https://github.com/angular/angular-cli/issues/9827).
