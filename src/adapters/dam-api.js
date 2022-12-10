// export function upload (filename, catalog, storagePath, readableStream) {}

// export function search (filename, catalog, tags, limit, writableStream) {}

// export function browse (catalog, tags, limit, writableStream) {}

// export function download (fileId, writableStream) {}

export function damUploadOut (service) {
  return function (data) {
    console.log({ data })
    return {
      filename: data.args[0].filename,
      status: 'UPLOADING'
    }
  }
}

export function damSearchOut (service) {
  return function (data) {
    return {
      tags: data.args[0].tags,
      matches: 361,
      status: 'COMPLETE'
    }
  }
}

export function damBrowseOut (service) {
  return function (data) {
    return {
      catalog: data.args[0].catalog,
      status: 'COMPLETE'
    }
  }
}

export function damDownloadOut (service) {
  return function (data) {
    return {
      fileId: data.args[0],
      status: 'DOWNLOADING'
    }
  }
}
