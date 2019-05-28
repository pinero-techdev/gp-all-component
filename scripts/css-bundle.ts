import { relative } from 'path';
import { Bundler } from 'scss-bundle';
import { writeFile } from 'fs-extra';
import * as fs from 'fs';

/** Bundles all SCSS files into a single file */
/**
 * Each scss file is copied from input dir and moved into one file in the output dir.
 * @param entry Input dir
 * @param output Output dir
 * @param files Dictionary of files contents by full path
 */
async function bundleScss(entry = '', output = '', files = []) {
  const { found, bundledContent, imports } = await new Bundler().Bundle(entry, files);

  if (imports) {
    const cwd = process.cwd();

    const filesNotFound = imports.filter((x) => !x.found).map((x) => relative(cwd, x.filePath));

    if (!fs.existsSync(output)) {
      fs.mkdirSync(output, { recursive: true });
    }

    if (filesNotFound.length) {
      console.error(`SCSS imports failed \n\n${filesNotFound.join('\n - ')}\n`);
      throw new Error('One or more SCSS imports failed');
    }
  }

  if (found) {
    await writeFile(output + '/main.scss', bundledContent);
  }
}

bundleScss(
  './projects/gp-all-component/src/lib/resources/scss/_main.scss',
  './dist/gp-all-component/lib/resources/scss'
);
