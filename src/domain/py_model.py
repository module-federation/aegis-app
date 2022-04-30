
class PyModel:
    def __init__(self, requestData):
        self.requestData = requestData
class PyModelSpec:
    def __init__(self) -> None:
        pass

    def __factory(requestData):
        return PyModel(requestData)

    def makeFactory(dependencies):
        return PyModelSpec.__factory
