# create symlink between aegis-host and aegis vs using npm

#export FORKRUN_CMD=/Users/tysonmidboe/.nvm/versions/node/v18.12.0/bin/node
#export FORKRUN_ARG=/Users/tysonmidboe/aegis-app/repo.jsjjj

# nvm install --lts
# nvm use --lts

cd ../aegis-app
nohup node repo.js &
nohup node repo.js 8001 cache &
cp ../aegis/wasm/build/release.wasm ../aegis-app/dist/main.wasm
yarn link

cd ../aegis-host
yarn link @module-federation/aegis
yarn start
