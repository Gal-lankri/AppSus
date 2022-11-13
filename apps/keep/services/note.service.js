import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

import notesData from '../../../data/notes.json' assert { type: 'json' }

const NOTES_KEY = 'notesDB'

_createNotes()

export const noteService = {
  query,
  get,
  remove,
  save,
  getNextNoteId,
  getPrevNoteId,
  createNote,
}

function query(filterBy) {
  var filter = { ...filterBy }
  var title = filter.title
  var type = filter.type
  var labels = [...filterBy.label]


  return storageService.query(NOTES_KEY)
    .then(notes => {
      const regex = new RegExp(title, 'i')
      let newNotes = notes.filter(note => {
        if (!title) return true
        return regex.test(note.info.title)
      })
      newNotes = newNotes.filter(note => {
        if (!type) return true
        return note.type === type
      })
      if (labels.length > 0) newNotes = newNotes.filter(note => note.info.label.some(label => labels.includes(label)))
      return newNotes
    })
}

function get(noteId) {
  return storageService.get(NOTES_KEY, noteId)
}

function remove(noteId) {
  return storageService.remove(NOTES_KEY, noteId)
}

function save(note) {
  console.log(`note:`, note)
  console.log(note.id)
  if (note.id) {
    return storageService.put(NOTES_KEY, note)
  } else {
    return storageService.post(NOTES_KEY, note)
  }
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTES_KEY)
  if (!notes || !notes.length) {
    notes = notesData
    utilService.saveToStorage(NOTES_KEY, notesData)
  }
}

function getNextNoteId(noteId) {
  return storageService.query(NOTES_KEY).then((notes) => {
    var idx = notes.findIndex((note) => note.id === noteId)
    if (idx === notes.length - 1) idx = -1
    return notes[idx + 1].id
  })
}

function getPrevNoteId(noteId) {
  return storageService.query(NOTES_KEY).then((notes) => {
    var idx = notes.findIndex((note) => note.id === noteId)
    if (idx === 0) idx = notes.length
    return notes[idx - 1].id
  })
}

function createNote(note) {
  console.log(`note:`, note)
  const newNote = _getNoteData(note)
  console.log(`newNote:`, newNote)
  return save(newNote)
    .then(response => { return response })
}

function _getNoteData(note) {
  console.log(`note:`, note)

  const { type, isPinned } = note
  const { title, value, label } = note.info
  const { backgroundColor } = note.info.style

  const newNote = {
    type,
    isPinned,
    info: {
      title,
      label,
      style: {
        backgroundColor,
      }
    }
  }

  if (type === 'note-txt') {

    newNote.info.txt = value

  } else if (type === 'note-img' || type === 'note-video') {

    newNote.info.url = value

  } else if (type === 'note-todos') {

    newNote.info.todos = value.split(',').map(todo => {
      return {
        txt: todo,
        doneAt: null,
      }
    })

  }
  return newNote
}
