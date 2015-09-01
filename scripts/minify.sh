#!/bin/bash

git_root=`git rev-parse --show-toplevel`

if [[ "`command -v uglifyjs`" == '' ]]; then
    printf 'you need to have uglifyjs installed\n\n    npm install uglify-js -g\n'
else
    uglifyjs ${git_root}/annotater.js -m -r 'annotater,Annotater' > ${git_root}/annotater.min.js
fi

