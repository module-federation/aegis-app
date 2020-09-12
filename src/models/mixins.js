import crypto from 'crypto';

function encrypt(data) {
  var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
  var mystr = mykey.update(data, 'utf8', 'hex')
  return mystr += mykey.final('hex');
}


export const remoteMixin = o => ({
  remoteMixin: true,
  ...o
})

export const redact = o => {
  const _redact = o['sensitive'] ? true : false;
  if (_redact) {
    o.sensitive = encrypt(o.sensitive);
  }
  return {
    redact: _redact,
    ...o
  }
}

const mixins = [
  remoteMixin,
  redact
];

export default mixins;


