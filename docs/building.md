# Building the Library

If you want to consume this library with your own applications, you may first build it for production. In order to do so, follow next instructions to learn how to do it. 

First please **make sure you met the requirements** as listed [here](/requirements) and then install all the library dependencies by running command below.

```bash
npm install
```

You are now able to run command below from **project root directory** (at the same level where the general package.json). After it has finished building the library, you’ll find the compiled target in the *dist* folder.

```bash
npm run build
```

You’ll also notice it has generated a *tgz* file. You can use this file to install the library in your own applications by executing command below from **that application** (not inside the library), where the path must be an **absolute path** (not relative) to where the tgz file is located.

```bash
npm i absolute/path/to/file.tgz
```