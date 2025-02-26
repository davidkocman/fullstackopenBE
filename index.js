import express from 'express'

import morgan from 'morgan'

// mock
import { notes } from './mock/notes.js'
import { persons } from './mock/persons.js'

// utils
import { generateId } from './utils/index.js'

// middleware
import { requestLogger, unknownEndpoint } from './middleware/index.js'

// exported values are always CONST values
let notesValue = notes
let personsValue = persons

const app = express()

// using middleware express.json()
// middleware functions are called in the order that they're encountered by the JavaScript engine
app.use(express.json())
app.use(morgan('tiny'))
// app.use(requestLogger)
app.use(express.static('dist'))

// ------------------------------------------------
// root
app.get('/', (_request, response) => {
  // there can be only one response.send() per request
  response.send('<h1>API root</h1>')
})


// notes api
// ------------------------------------------------
app.get('/api/notes', (_request, response) => {
  response.json(notesValue)
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notesValue.find(note => note.id === Number(id)) || null
  if (!note) {
    response.status(404).json({
      error: `Note with id: ${id} was not found!`
    })
    return
  }
  response.json(note)
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const foundNote = notesValue.find(note => note.id === id) || null
  if (!foundNote) {
    return response.status(404).json({
      error: `Note with id: ${id} was not found!`
    })
  }
  notesValue = notesValue.filter(note => note.id !== id)
  response.json(notesValue)
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {

  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const newNote = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(notesValue),
  }

  notesValue = notesValue.concat(newNote)

  response.json(notesValue)
})


// persons api
// ------------------------------------------------
app.get('/api/persons/', (_request, response) => {
  response.json(personsValue)
})

app.get('/api/info', (_request, response) => {
  response.send(`Phonebook has info for ${personsValue.length} people <br /> ${new Date()}`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = personsValue.find(person => person.id === Number(id)) || null
  if (!person) {
    response.status(404).json({
      error: `Person with id: ${id} was not found!`
    })
    return
  }
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const foundPerson = personsValue.filter(person => person.id === id) || null
  if (!foundPerson) {
    return response.status(404).json({
      error: `Person with id: ${id} was not found!`
    })
  }
  personsValue = personsValue.filter(person => person.id !== id)
  response.json(personsValue)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  const name = request.body.name
  const nameAleardyExists = personsValue.find(person => person.name === name) || null

  if (!body.name) return response.status(400).json({ error: 'Name missing!' })
  if (!body.number) return response.status(400).json({ error: 'Number missing!' })

  if (nameAleardyExists) {
    return response.status(400).json({
      error: `Name ${name} is already in persons!`
    })
  }

  const newPerson = {
    id: generateId(personsValue),
    name: body.name,
    number: body.number
  }

  personsValue = personsValue.concat(newPerson)
  response.json(personsValue)
})


// 404 -endpint middleware
app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})