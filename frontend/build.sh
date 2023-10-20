#!/bin/bash

DIST_FOLDER=../docs

mkdir -p $DIST_FOLDER &&

cp -r public/* $DIST_FOLDER/ &&

babel \
src/utils.js \
src/app.js \
src/quiz.js \
src/places.js \
src/quotes.js \
-o $DIST_FOLDER/app.js &&

uglifyjs \
src/lib/sweetalert2.min.js \
src/lib/1-lightgallery.min.js \
src/lib/2-lightgallery-zoom.min.js \
src/lib/3-lightgallery-autoplay.min.js \
$DIST_FOLDER/app.js \
-c drop_console=true,toplevel=true -m toplevel=true -o $DIST_FOLDER/app.min.js &&

rm $DIST_FOLDER/app.js &&

html-minifier --collapse-whitespace --remove-comments \
src/header.html \
src/main.html \
src/quiz.html \
src/places.html \
src/loading.html \
src/footer.html \
-o $DIST_FOLDER/index.html &&

cleancss \
src/lib/bootstrap.min.css \
src/lib/sweetalert2.min.css \
src/lib/icomoon.css \
src/lib/animate.min.css \
src/lib/lightgallery.min.css \
src/custom.css \
-o $DIST_FOLDER/custom.min.css
