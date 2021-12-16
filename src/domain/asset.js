"use strict";

export function makeAssetFactory(dependencies) {
  return async function createAsset({
    filename, 
    baseurl, 
    type, 
    size_bytes, 
    md5_hash
  }) {
    const asset = {
      filename, 
      baseurl, 
      type, 
      size_bytes, 
      md5_hash
    }

    return Object.freeze(asset)
  }
}
