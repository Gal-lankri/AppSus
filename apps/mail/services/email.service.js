import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
const emailsData = await fetch('../../../data/email.json').then(res => res.json());

const EMAILS_KEY = 'emailsDB'
const loggedinUser = { email: 'user@appsus.com', fullname: 'Mahatma Appsus' }
_createEmails()

export const emailService = {
  query,
  get,
  remove,
  save,
  getNextEmailId,
  getPrevEmailId,
  getEmptyEmail,
  countUnred,
}

function query(filterBy) {
  if (filterBy === undefined) {
    return storageService.query(EMAILS_KEY)
  } else
    return storageService.query(EMAILS_KEY).then((emails) => {
      const regex = new RegExp(filterBy.text, 'i')
      let newEmails = emails.filter((email) => regex.test(email.subject))
      if (filterBy.isRead != 'all') {
        newEmails = newEmails.filter((email) => (filterBy.isRead ? email.isRead : !email.isRead))
      }
      if (filterBy.status) {
        newEmails = newEmails.filter((email) => email.status === filterBy.status)
      }
      return newEmails
    })
}

function countUnred() {
  return query().then((emails) => {
    const newEmails = emails.filter((email) => !email.isRead)
    return newEmails.length
  })
}

function get(emailId) {
  console.log(`emailId:`, emailId)
  return storageService.get(EMAILS_KEY, emailId)
}

function remove(emailId) {
  return storageService.remove(EMAILS_KEY, emailId)
}

function save(email) {
  if (email.id) {
    return storageService.put(EMAILS_KEY, email)
  } else {
    return storageService.post(EMAILS_KEY, email)
  }
}

function _createEmails() {
  let emails = utilService.loadFromStorage(EMAILS_KEY)
  if (!emails || !emails.length) {
    emails = emailsData
    utilService.saveToStorage(EMAILS_KEY, emails)
  }
}

function _createEmail(subject, body, to) {
  const email = getEmptyEmail(vendor, maxSpeed)
  email.id = utilService.makeId()
  return email
}

function getEmptyEmail(subject, body, to) {
  return {
    id: '',
    subject,
    body,
    isRead: null,
    status: 'sent',
    sentAt: Date.now(),
    from: { name: loggedinUser.fullname, emailAddress: loggedinUser.email },
    to,
  }
}

function getNextEmailId(emailId) {
  return storageService.query(EMAILS_KEY).then((emails) => {
    var idx = emails.findIndex((email) => email.id === emailId)
    if (idx === emails.length - 1) idx = -1
    return emails[idx + 1].id
  })
}

function getPrevEmailId(emailId) {
  return storageService.query(EMAILS_KEY).then((emails) => {
    var idx = emails.findIndex((email) => email.id === emailId)
    if (idx === 0) idx = emails.length
    return emails[idx - 1].id
  })
}
