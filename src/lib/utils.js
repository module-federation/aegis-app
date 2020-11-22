'use strict'

import crypto from 'crypto';

export function compose(...funcs) {
  return function (initVal) {
    return funcs.reduceRight(
      (val, func) => func(val),
      initVal
    );
  }
}

export function composeAsync(...funcs) {
  return function (initVal) {
    return funcs.reduceRight(
      (val, func) => val.then(func), Promise.resolve(initVal)
    );
  }
}

const passwd = 'secret';
const algo = 'aes-192-cbc';
const key = crypto.scryptSync(passwd, 'salt', 24);
const iv = Buffer.alloc(16, 0);

export function encrypt(text) {
  const cipher = crypto.createCipheriv(algo, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted
}

export function decrypt(cipherText) {
  // console.log('decrypt(%s)', cipherText);
  const decipher = crypto.createDecipheriv(algo, key, iv);
  let decrypted = decipher.update(cipherText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

export function hash(data) {
  return crypto.createHash('sha1').update(data).digest('hex');
}

export function uuid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11)
    .replace(/[018]/g, c => (c ^ crypto.randomBytes(16)[0] & 15 >> c / 4)
      .toString(16));
}