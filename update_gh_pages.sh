#!/bin/bash
# https://gist.github.com/cobyism/4730490
git push
git push --tags
git subtree push --prefix dist origin gh-pages
