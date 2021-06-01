#!/bin/bash

rm -rf ../www/themes/gavias_sanbro/app/*
ng build \
--output-path ../www/themes/gavias_sanbro/app \
--deploy-url /themes/gavias_sanbro/app \
--target=production \
"$@"
