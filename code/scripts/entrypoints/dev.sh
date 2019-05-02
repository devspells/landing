# !/bin/bash

rm -rf build;
mkdir build;

npx http-server build&
APP_ENV=development node scripts/dev-server.js;
