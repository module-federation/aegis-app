type cb = (data: string) => string
type httpOptions = { method: string, body: string, file: string, headers: { idempotencyKey: string } }
type httpResponse = Promise<any>
type modelOptions = { export: string[], loadCache: boolean, cacheSize: number }

interface IAegis {
  add (cb: cb): void
  addModel (name: string, cb: cb, options: modelOptions): Model
  listen (): void
  httpClient (url: string, options: httpOptions): httpResponse
}

interface IModel {
  addMethod (name: string, cb: cb): void
  addAdapter (name: string, cb: cb): void
  addService (name: string, cb: cb): void
  addRelation (name: string, model: string, foreignKey: string, desc: string, localOnly: boolean): Model
  addDataSource (name: string, adapter: string)
}

declare class Litehouse implements IAegis {
  add (cb: cb): void
  addModel (name: string, cb: cb, options: modelOptions): Model
  httpClient (url: string, options: httpOptions): httpResponse
  listen (): void
}

declare class Model implements IModel {
  addMethod (name: string, cb: cb): void
  addAdapter (name: string, cb: cb): void
  addService (name: string, cb: cb): void
  addRelation (name: string, model: string, foreignKey: string, desc: string, localOnly: boolean): Model
}