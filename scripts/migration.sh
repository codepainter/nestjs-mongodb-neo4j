#!/bin/bash
printf "🏗️👷 Running Migration Script 👷🏗️\n"
if [ "$#" -ne 2 ]
then
  echo "Incorrect number of arguments. Usage: migration.sh [show|run|revert] [service-name]"
  exit 1
fi

printf "🏗️👷 Compiling Typescript... 👷🏗️\n"
yarn tsc

case $1 in
  "show")
    printf "🏗️👷 Showing migration... 👷🏗️\n"
    ;;
  "run")
    printf "🏗️👷 Running migrations... 👷🏗️\n"
    ;;
  "revert")
    printf "🏗️👷 Reverting migrations... 👷🏗️\n"
    ;;
esac

yarn typeorm migration:$1 -d dist/libs/database/src/$2/data-source.js

printf "🏁 Migration complete! 🏁"