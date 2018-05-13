#!/bin/bash

cd ../
npm install
bower install --allow-root
grunt

cd build
npm install

