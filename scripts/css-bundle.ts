import { relative } from 'path';
import { Bundler } from 'scss-bundle';
import { writeFile } from 'fs-extra';
import * as fs from 'fs';

/** Bundles all SCSS files into a single file */
async function bundleScss() {
  const dirOutput = './dist/gp-all-component/lib/resources/scss';
  const { found, bundledContent, imports } = await new Bundler().Bundle(
    './projects/gp-all-component/src/lib/resources/scss/theme-360/_theme.scss'
  );

  if (imports) {
    const cwd = process.cwd();

    const filesNotFound = imports.filter((x) => !x.found).map((x) => relative(cwd, x.filePath));

    if (!fs.existsSync(dirOutput)) {
      fs.mkdirSync(dirOutput);
    }

    if (filesNotFound.length) {
      console.error(`SCSS imports failed \n\n${filesNotFound.join('\n - ')}\n`);
      throw new Error('One or more SCSS imports failed');
    }
  }

  if (found) {
    await writeFile(dirOutput + '/_theme.scss', bundledContent);
  }
}

bundleScss();
