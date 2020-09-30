import crypto from 'crypto';

export function compose(...funcs) {
  return function (initVal) {
    return funcs.reduceRight(
      (val, func) => func(val), 
      initVal
    );
  }
}

export function encrypt(text) {
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);
  let cipher = crypto.createCipheriv(
    'aes-256-cbc', Buffer.from(key), iv
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('hex');
}

export function requireParams(params) {
  Object.keys(params).forEach(key => {
    if (!params[key]) {
      throw new Error(`param ${key} missing or invalid`);
    }
  });
}

export function hash(data) {
  return crypto.createHash('sha1').update(data).digest('hex');
}

export function uuid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11)
    .replace(/[018]/g, c => (c ^ crypto.randomBytes(16)[0] & 15 >> c / 4)
      .toString(16));
}