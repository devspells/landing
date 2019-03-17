const
  fs               = require('fs'),
  fse              = require('fs-extra'),
  readdirRecursive = require('fs-readdir-recursive'),
  rimraf           = require('rimraf'),
  jsdom            = require('jsdom').JSDOM,
  htmlMinify       = require('html-minifier').minify;


const run = () => {
  // link assets in html
  const manifest = fse.readJsonSync(process.cwd() + '/build/assets/manifest.json');

  const tmpDir = process.cwd() + '/tmp';
  fs.existsSync(tmpDir) || fs.mkdirSync(tmpDir);
  fse.copySync(process.cwd() + '/html/', tmpDir + '/html/');

  const htmlFiles = readdirRecursive(process.cwd() + '/html/');

  // replace assets links in html
  htmlFiles.forEach(file => {
    const dom = new jsdom(fs.readFileSync(process.cwd() + '/tmp/html/' + file, 'utf-8'));

    Object.keys(manifest).forEach(asset => {
      const css = dom.window.document.querySelector(`link[href="${asset}"]`);
      if (css) css.href = `/assets/${manifest[asset]}`;

      const js  = dom.window.document.querySelector(`script[src="${asset}"]`);
      if (js) js.src = `/assets/${manifest[asset]}`;
    });

    const outHTML = htmlMinify(`<!DOCTYPE html>\n${dom.window.document.documentElement.outerHTML}`, {
      collapseBooleanAttributes: true,
      collapseInlineTagWhitespace: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
      preserveLineBreaks: true,
      removeComments: true,
      useShortDoctype: true
    });
    fs.writeFileSync(process.cwd() + '/tmp/html/' + file, outHTML);
  });

  fse.copySync(tmpDir + '/html/', process.cwd() + '/build/');
  rimraf.sync(tmpDir);
};

if (require.main === module) run();

module.exports = run;
