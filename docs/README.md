# Introduction

GP All Component is a library of components for building projects in Grupo Piñero. The purpose of this library is joining the common components and in an easy way to pick up and integrate them in other projects.

The library was made in Angular 7.2.0, if you’d like to learn more about how the GpAllComponent should be used, we created a sample project.

## Requisites
Before you begin, make sure your development environment includes Node.js ^10.15.3 and NPM ^6.4.0.

To check node version, run `node -v`, in a terminal/console window.

To check npm version, run `npm -v`, in a terminal/console window.

## Getting started
```javascript
/* 1. Clone the repository: */
http://teamdev.cen.intranet/angular-components/gp-all-component.git

/* 2.Enter the cloned folder */
cd gp-all-component

/*  3. Install dependencies. Make sure node.js is intalled on your system.
* For more info, see requisites below. */
npm install 
```

## Dependencies installation

In order to be able to use the library from your application, please consider there are some dependencies that need to be installed and properly configured, we’ll describe next what are those dependencies, and the necessary configurations for PrimeNg, Quill and Moment:

### PrimeNg

Install PrimeNg, PrimeIcons and Angular animations.

```
npm install primeng primeicons @angular/animations primeflex --save
```

Install Angular CDK and RXJS.

```
npm install @angular/cdk rxjs-compat --save
```

Add PrimeNG and Prime CSS to styles in angular.json.

```
"styles": [
    "node_modules/primeng/resources/primeng.min.css",
    "node_modules/primeicons/primeicons.css",
    "node_modules/primeflex/primeflex.css",
    "node_modules/primeng/resources/themes/nova-light/theme.css"
]
```

You need to import BrowserAnimationsModule to your application, preferably inside the app.module.ts. If you prefer to disable animations globally, import NoopAnimationsModule instead

```
@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
    ]
})
```

### Quill Editor
Install Quill:

```
npm install quill --save
```

Add Quill to scripts in angular.json.

```
"scripts": [ "node_modules/quill/dist/quill.js" ]
```

Add Quill css to styles in angular.json.

```
"styles": [
"node_modules/quill/dist/quill.core.css",
"node_modules/quill/dist/quill.snow.css"
]
```

### Moment.js

Install Moment:

```
npm install moment --save
```

If you need more information check out the Moment.js Documentation here: https://momentjs.com



### Styles

Include the main stylesheet for the gp-all-component library, add it in your angular.json located in the root folder.

```
"styles": [
    "node_modules/gp-all-component/lib/resources/scss/main.scss"
]
```

::: warning
*If you are working with npm link, the import above won't work. Please review [“Common Issues - Library Styles"](development.html#library-styles) for a solution for this. You can safely ignore this warning if you work with tgz or other alternatives, this issue only happens with npm link*
:::

### Existing issues
#### Node Global Error
Adding this line to polyfills.ts should resolve node global error:

`(window as any).global = window;`

You can have more information about this issue in this thread: [Angular issues](https://github.com/angular/angular-cli/issues/9827)

#### Found bindings for the following environments (Windows 64-bit with Node.js 11.x)

  Run `npm rebuild node-sass` to download the binding for your current environment.