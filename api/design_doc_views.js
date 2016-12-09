const PouchDB = require('pouchdb-http')
const dal = require('../api/dal.js')
const db = new PouchDB('https://cantops:cantops@cantops.cloudant.com/mishmash')

var ddoc1 = {
  _id: '_design/circles',
  views: {
    "circles": {
      map: function(doc) {
        if (doc.type === 'circle') {
          emit(doc._id)
        }
      }.toString()
    }
  }
}

var ddoc2 = {
  _id: '_design/friends',
  views: {
    "friends": {
      map: function(doc) {
        if (doc.type === 'friend') {
          emit(doc._id)
        }
      }.toString()
    }
  }
}

var ddoc3 = {
  _id: '_design/restaurants',
  views: {
    "restaurants": {
      map: function(doc) {
        if (doc.type === 'restaurant') {
          emit(doc._id)
        }
      }.toString()
    }
  }
}

var ddoc4 = {
  _id: '_design/sessions',
  views: {
    "sessions": {
      map: function(doc) {
        if (doc.type === 'session') {
          emit(doc._id)
        }
      }.toString()
    }
  }
}


dal.createView(ddoc1, function(err, data) {
    if (err)
        return console.log('ERROR CREATING DESIGN DOC FOR CIRCLE:\n', err.message)
    if (data) {
        console.log('DESIGN DOC CREATED FOR CIRCLE', data)
    }
})

dal.createView(ddoc2, function(err, data) {
    if (err)
        return console.log('ERROR CREATING DESIGN DOC FOR FRIEND:\n', err.message)
    if (data) {
        console.log('DESIGN DOC CREATED FOR FRIEND', data)
    }
})

dal.createView(ddoc3, function(err, data) {
    if (err)
        return console.log('ERROR CREATING DESIGN DOC FOR RESTAURANT:\n', err.message)
    if (data) {
        console.log('DESIGN DOC CREATED FOR RESTAURANT', data)
    }
})

dal.createView(ddoc4, function(err, data) {
    if (err)
        return console.log('ERROR CREATING DESIGN DOC FOR SESSION:\n', err.message)
    if (data) {
        console.log('DESIGN DOC CREATED FOR SESSION', data)
    }
})
