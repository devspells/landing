const
  execSync         = require('child_process').execSync,
  chokidar         = require('chokidar'),
  webpack          = require('webpack'),
  webpackConfig    = require(process.cwd() + '/configs/webpack.config'),
  linkAssetsInHTML = require('./link-assets-in-html');


const build = () => {
  webpack(webpackConfig, (error, stats) => {
    if (error || stats.hasErrors()) {
      console.error('webpack compile error');
      console.error((stats.compilation.errors || []).join('\n'));
      return;
    }

    execSync('npx contentica --config configs/contenticarc.json --mock-input;');
    execSync('cp -a static-assets/. build/assets/');
    linkAssetsInHTML();

    console.log('rebuild completed');
  });
};

chokidar.watch('.', {
  ignored: [
    './node_modules/**/*',
    './build/**/*',
    './tmp/**/*',
    './html/**/*',
    /(^|[\/\\])\../,
  ]
}).on('change', build);

build();
