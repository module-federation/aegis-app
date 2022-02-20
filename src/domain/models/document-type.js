const doctypes = {
    type1: Symbol(),
    type2: Symbol()
}

export class BaseDocumentType extends DocumentType {
  constructor (name, type) {
    this.type = doctypes[type]
    this.name = name
    this.type = type
    this.objectName,
    this.collectionName
    this.relations
  }

  serialize()

  deserialize()

  marshal()

  unmarshal()

  load()

  save()

  find()

  delete()

  list()

  getProperties()
}

const DocumentType = (() => {

    function createDocument(name, type) {
    return new BaseDocumentType(name, type)
    }

    return  {
        createDocument
    }
})()

