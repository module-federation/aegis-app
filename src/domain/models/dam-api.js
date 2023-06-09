export function damUploadIn (data) {
  return this.damUploadOut(data.args)
}

export function damSearchIn (data) {
  return this.damSearchOut(data.args)
}

export function damBrowseIn (data) {
  return this.damBrowseOut(data.args)
}

export function damDownloadIn (data) {
  return this.damDownloadOut(data.id)
}
