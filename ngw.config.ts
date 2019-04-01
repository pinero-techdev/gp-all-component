import * as webpack from 'webpack';
import { Path } from '@angular-devkit/core';
import { NormalizedBrowserBuilderSchema } from '@angular-devkit/build-angular';
const MergeJsonWebpackPlugin = require('merge-jsons-webpack-plugin');

export interface WebpackOptions<T = NormalizedBrowserBuilderSchema> {
    root: Path;
    projectRoot: Path;
    options: T;
}

const command = process.argv[2].toLowerCase();

export default function (config: webpack.Configuration, options: WebpackOptions) {
  debugger;
  config.plugins.unshift(
    new MergeJsonWebpackPlugin({
      'output': {
        'groupBy': [
          {
            'pattern': './projects/gp-all-component/src/assets/locale/**/en-US.lang.json',
            'fileName': './projects/gp-all-component/src/assets/locale/en-US-merged.lang.json'
          }
        ]
      },
      'globOptions': {
        'nosort': true
      }
    })
  );

  console.warn('Using `ngw` to input inject webpack steps.');
  return config;
}
