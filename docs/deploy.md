# How to deploy a new version 
There are two ways to build and package up the app. We strictly recommend to use the commands: 


## Versioned

According to semantic versioning of npm:

"To keep the JavaScript ecosystem healthy, reliable, and secure, every time you make significant updates to an npm package you own, we recommend publishing a new version of the package with an updated version number in the package.json file"

To help developers who rely on the code, its recommended starting a package version at 1.0.0 and incrementing as follows:

| Status                 | Stage                    | Rule                    | Version |
| :---------------------- |:------------------------|:-----------------------| -------:|
| First release.                    | New product      | Start with 1.0.0        | 1.0.0   |
| Backward compatible bug fixes.    | Patch release    | Increment 3th digit     |  1.0.1  |
| Backward compatible new features. | Minor release    | Increment the middle digit and reset last digit o zero | 1.1.0   |                        
| Changes that break backward compatibility | Major release | Increment the first digit and reset middle and last digits to zero | 2.0.0 |

<br>

As defined within the table above, next commands will help to maintain versions of the package:

1. **prebuild:patch**, if changes are fixes or similar.
2. **prebuild:minor**, for simple features or minor changes. 
3. **prebuild:major**, for dependencyBreaking changes: renaming. 

 
These prebuilds commands updates the version of two package.json files ( root and project/gp-all-component ) and continues with the build and packaging procedure. 

e.g: ``` npm run prebuild:minor ```

## Unversioned
The other way is running directly the command **build** that executes the building and packaging process without versioning the package, this way is unrecommended. 