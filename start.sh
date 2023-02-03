                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                export LOADCACHE=false
cd ../aegis-app
nohup node repo.js &
# nohup node repo.js 8001 cache &
# cp ../aegis/wasm/build/release.wasm ../aegis-app/dist/main.wasm

cd ../aegis-host
node --title aegis src/bootstrap.js | tee >public/aegis.log
