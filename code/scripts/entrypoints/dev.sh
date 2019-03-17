# !/bin/bash

rm -rf build;
mkdir build;

npx http-server build&
node scripts/dev-server.js;
