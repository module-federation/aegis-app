# def __init__(self):
#     print('constructor')

# def _factory(self, dependencies):
#     self.dependencies = dependencies
#     return self.factory

# def factory(self):
#     return self

# def print_sum(a, b):
#     print(a + b)

#  from typing_extensions import Self

class Py_Model:
    def __init__(self, requestData):
        self.requestData = requestData


class Py_Model_Spec:
    def __init__(self) -> None:
        pass

    def __factory(requestData):
        return Py_Model(requestData)

    def makeFactory(dependencies):
        return Py_Model_Spec.__factory
