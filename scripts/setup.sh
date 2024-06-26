#!/bin/bash
printf "🏗️👷 Installing nvm... 👷🏗️\n"

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

printf "🏗️👷 Installing node... 👷🏗️\n"

nvm install 
nvm use

printf "🏗️👷Installing pnpm... 👷🏗️\n"

npm -g install pnpm

printf "🏁 Setup complete! 🏁"