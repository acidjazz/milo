#!/bin/bash

s3cmd --config=/Users/k/.s3tribalcfg  --exclude 'deploy.sh' --exclude 'cof/*' --exclude 'sty/*' --exclude 'tpl/*' --exclude '.git/*' --exclude '.DS_Store' --exclude 'css/_*' sync . s3://www.mktreattruck.com
s3cmd setacl --config=/Users/k/.s3tribalcfg s3://www.mktreattruck.com/ --acl-public --recursive
