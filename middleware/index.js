import { isEmptyObject } from "../utils/index.js"

const requestLogger = (request, _response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  if (!isEmptyObject(request.body)) console.log(`Body:  `, request.body)
  console.log('------------------------')
  next()
}

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

export {
  requestLogger,
  unknownEndpoint
}