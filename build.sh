#!/bin/sh

#read -p "Did you point baseURL in auth-skil.interceptor properly? (Y/N): " baseURLCheck
baseURLCheck='Y'


git add --all

git commit -m "$1"

git push origin master

echo "\nThank you, will proceed with build\n"

npm run build


