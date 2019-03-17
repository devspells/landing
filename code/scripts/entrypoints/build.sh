# !/bin/bash

rm -rf build;
mkdir build;
mkdir build/assets;

cp -a static-assets/. build/assets;

npx contentica --config configs/contenticarc.json;
npx webpack --config configs/webpack.config.js --mode production;
node scripts/link-assets-in-html.js;
npx sw-precache --root=build;
