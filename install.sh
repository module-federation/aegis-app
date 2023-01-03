export PORT=8080
cd ..
# git clone https://github.com/module-federation/aegis
# git clone https://github.com/module-federation/aegis-host
cd aegis
yarn
yarn build
cd ../aegis-app
yarn
yarn build
cd ../aegis-host
yarn
cd ../aegis-app
nohup node repo.js 8000 dist &
nohup node repo.js 8001 cache &
cd ../aegis
yarn link
cd ../aegis-host
yarn link @module-federation/aegis
yarn build
cd ../aegis
nohup node watch.mjs &
cd ../aegis-host
nohup node watch.mjs &
node --title aegis src/bootstrap.js | tee public/aegis.log
