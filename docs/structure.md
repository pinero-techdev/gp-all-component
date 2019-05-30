
# Project Structure

To develop a new component for the library you should follow the project file structure. 

Keep in mind that the idea behind a library is to have every component / directive isolated from the general application state. We don’t have a main root module to bootstrap the library. Every component / directive has its own module and in those modules are going to load the dependencies required to the correct working of itself.

The library’s file structure is composed by the following directories:

| Folder Name | Description |
|-------------|-------------|
| Components | Here you define library components |
| Directives | Here you define your structural/attribute directives |
| Resources | Common code as constant, models or images, scss or localization i18n are here |
| Services | Component services where they fetch/save data |
| Shared | Common modules, e.g. primeng importers |
| Utils | Common functions used throughout the app |