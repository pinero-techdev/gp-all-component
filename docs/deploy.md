# How to deploy a new version 
There are two ways to build and package up the app. We strictly recommend to use the commands: 


## Versioned
1. **Prebuild:patch**, if changes are fixes or similar. 
2. **Prebuild:minor**, for simple features or minor changes. 
3. **Prebuild:major**, for dependencyBreaking changes: renaming.. 

 
These prebuilds commands updates the version of two package.json files ( root and project/gp-all-component ) and continues with the build and packaging procedure. 

## Unversioned
The other way is running directly the command **build** that executes the building and packaging process without versioning the package, this way is unrecommended. 