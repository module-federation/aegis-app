class QeError extends Error {
  constructor (message, code) {
    super(message)
    this.code = code
  }
}

function fibonacci (x) {
  if (x === 0) {
    return 0
  }
  if (x === 1) {
    return 1
  }
  return fibonacci(x - 1) + fibonacci(x - 2)
}

export async function qeRunFibonacci (data) {
  console.log({ data })
  const param = parseInt(data.args.fibonacci || 20)
  const start = Date.now()
  return {
    fibonacci: param,
    result: fibonacci(param),
    time: Date.now() - start
  }
}

export async function qeCustomHttpStatus (data) {
  throw new QeError(`custom http status ${data.args.code}`, data.args.code)
}

export async function qeGetPublicIpAddressIn (data) {
  try {
    return this.qeGetPublicIpAddressOut()
  } catch (error) {
    throw new QeError(error, 500)
  }
}
