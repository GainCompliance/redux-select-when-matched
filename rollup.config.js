/* eslint import/no-extraneous-dependencies: ['error', {'devDependencies': true}] */
import babel from 'rollup-plugin-babel';
import autoExternal from 'rollup-plugin-auto-external';

export default {
  input: 'src/index.js',
  plugins: [
    autoExternal(),
    babel({
      babelrc: false,
      externalHelpers: true,
      exclude: ['./node_modules/**'],
      presets: [['@gaincompliance', {targets: {node: 8, browser: true}, react: true, modules: false}]],
      plugins: ['@babel/external-helpers']
    })
  ],
  output: [
    {file: 'lib/index.cjs.js', format: 'cjs', sourcemap: true},
    {file: 'lib/index.es.js', format: 'es', sourcemap: true}
  ]
};
