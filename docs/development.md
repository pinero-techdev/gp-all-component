
# Development Setup

In the following section we’ll explain how you can setup the development environment to be able to make customisations to the library in order to fix any issue or extend its functionality. The easiest way is the manual comile approach, but it might become a bit repetitive over the time, so there’s an alternative way to live reload all the changes you are making using npm link. Feel free to choose the approach you like the most.

## Manual Approach 

1. From the project root, run `npm i` to install the dependencies 

2. Made the changes to the library as you need 

3. Run `npm run build` to compile project, and when it finishes, you'll find a .tgz file located in *dist/gp-all-component*, which you can use to install the library in the app you want to use it with command `npm i absolute/path/to/file.tgz` where the path must be an **absolute path** (not relative) to where the tgz file is located. 

 

## Automatic Approach 

 

You can also setup the project to be able to live reload all the changes you made to the library, but that needs just a bit of extra configuration steps. 

 

0. For Windows users, you can skip up to step 5

1. Only for Mac users, there might be permissions issues, so you may need to install nvm (if you don’t have a node version manager already) to overcome them, instructions here: [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)

2. With nvm available, install node version 10.15.3

```bash
nvm install 10.15.3
```

3. Make it the default node version

```bash
nvm alias default 10.15.3
```

4. Close the command line, and open it again to reload node path 

5. Start the build angular process in watch mode

```bash
npm run build:watch
```

6. When build has finished and waiting for file changes, browse into the *dist/gp-all-component* directory and run command below

```bash
npm link
```

7. The library is **ready to consume** with live preview by running the following command from the **external application** root directory

```bash
npm link gp-all-component
```

::: warning
⚠️ Make sure you are running this command from the aplication which is going to consume the library, not inside the library itself.
:::

8. Make sure you review the [library styles](#library-styles) issue below to properly see the stylings for the library

## Common issues with NPM Link

### Library Styles 

To be able to **see the library styles** while working with **npm link**, you need to include the following import in the general `styles.scss` instead of doing it inside the `angular.json` file as specified in the [installation](/installation) instructions: 

```scss 

@import '../node_modules/gp-all-component/lib/resources/scss/main.scss'; 

``` 

::: warning
⚠️ Make sure you remember to revert previous step whenever you are going to commit something!
:::

Currently there is not a better way to solve this, as seen in the following [thread](https://github.com/angular/angular-cli/issues/3500)

### Critical Dependency Error 

 In case you have any **critical dependency** errors, you may need to config your `tsconfig.json` file with the following paths in compiler options
 
``` json
"paths": { 

    "@angular/*": ["node_modules/@angular/*"], 

    "rxjs": ["node_modules/rxjs"], 

    "rxjs-compat": ["node_modules/rxjs-compat"], 

    "primeng": ["node_modules/primeng"], 

    "primeicons": ["node_modules/primeicons"], 

    "primeflex": ["node_modules/primeflex"], 

    "moment": ["node_modules/moment"] 

} 
```

### Permission Access Error (Only Windows) 

For Windows users, if anytime you find an `EACCESS: Permission Access Error` and you are unable to delete the dist folder, you can follow next steps to delete it: 

1. Press `WIN + R` in keyboard to open windows runner 

2. Execute command below where `User` may be replaced with your computer local user name 

```console
runas /user:User cmd
```

3. Once executed, from the cmd you’ve just opened, browse to the root directory of the project that contains the "conflictive" dist folder

```console
cd path/to/project/root/directory
```

4. Once there run command below, where `dist` may be the path to the dist folder to delete 

```console
RD /S /Q "dist"
```

5. Once you’ve done this, the dist folder should have been deleted successfully, and you now would be able to execute command below again as you are used to

```bash
npm run build:watch
```