const path = require('path')
const PouchDB = require('pouchdb-http')
PouchDB.plugin(require('pouchdb-mapreduce'))
const fetchConfig = require('zero-config')

var config = fetchConfig(path.join(__dirname, '..'), {
  dcValue: 'test'
})
const urlFormat = require('url').format
const db = new PouchDB('DB_URL=https://cantops:cantops@cantops.cloudant.com/mishmash')


const dal = {
  listDocs: listDocs,
  //////////////////////////
  createView: createView,
  //////////////////////////
  createFriend: createFriend,
  getFriend: getFriend,
  listFriends: listFriends,
  deleteFriend: deleteFriend,
  updateFriend: updateFriend,
  ///////////////////////////
  createCircle: createCircle,
  getCircle: getCircle,
  updateCircle: updateCircle,
  deleteCircle: deleteCircle,
  listCircles: listCircles,
  ///////////////////////////
  createRestaurant: createRestaurant,
  getRestaurant: getRestaurant,
  updateRestaurant: updateRestaurant,
  deleteRestaurant: deleteRestaurant,
  listRestaurants: listRestaurants,
  ///////////////////////////
  createSession: createSession,
  getSession: getSession,
  updateSession: updateSession,
  deleteSession: deleteSession,
  listSessions: listSessions
}


///////////////////////////////////
//////   Utility function   ///////
///////////////////////////////////

function listDocs(sortBy, startKey, limit, callback) {
 db.query(sortBy, {        //TELL IT TO SHOW DOCS
   include_docs: true,
   startkey: startKey,
   limit: limit
 }, function(err, data) {
   if (err) return callback(err)
   if (startKey !== '') data.rows.shift()
   callback(null, data)
 })
}
// Promise version -- maybe
// db.query(sortBy, {
//   include_docs: true,
//   startkey: startKey,
//   limit: limit
// }).then(function(result){
//   if (startKey !== '') data.rows.shift()
//   callback(null, data)
// }).catch(function(err) {
//   console.log(err)
// })

/////       Design Doc View      ///
function createView(ddoc, callback) {
   if (typeof ddoc == "undefined" || ddoc === null) {
       return callback(new Error('400Missing design document.'))
   } else {
       db.put(ddoc).then(function(response) {
         console.log('Design Doc View Complete')
           return callback(null, response)
       }).catch(function(err) {
           return callback(err)
       })
   }
}

///////////////////////////////////
//////     Friends DAL      ///////
///////////////////////////////////

function createFriend(friend, callback) {
// send this back to the caller via the callback (from pouch)
  // {
  //   "ok": true,
  //   "id": "",
  //   "rev": ""
  // }
// need an object to create our response
// mocking up db call


// db.put({
//   _id: "friend_" + friend.email,
//   title: ""
// }).then(function(response) {
//
// })

  const id = "friend_" + friend.email

  const friendResponse = {
    ok: true,
    id: id,
    rev: "1-A09739A80B7509FFF837509F"
  }
// how do we get that back to the callback and say success
  return callback(null, friendResponse)
}

function deleteFriend(id, callback) {
  return callback(null, {
    ok: true,
    id: id,
    rev: "1-A09739A80B7509FFF837509F"
  })
}

function updateFriend(friend, callback) {
// friend._id = 'James'
// friend._rev =
// friend.lastname = "Rodgers"
  const friendResponse = {
    ok: true,
    id: friend._id,
    rev: "1-A09739A80B7509FFF837509F"
  }
  return callback(null, friendResponse)
}

function listFriends(callback) {
  callback(null, {
      "offset": 0,
      "total_rows": 1,
      "rows": [{
        "doc": {
          "_id": "0B3358C1-BA4B-4186-8795-9024203EB7DD",
          "_rev": "1-5782E71F1E4BF698FA3793D9D5A96393",
          "title": "Sound and Vision",
          "_attachments": {
          	"attachment/its-id": {
          	  "content_type": "image/jpg",
          	  "data": "R0lGODlhAQABAIAAAP7//wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
          	  "digest": "md5-57e396baedfe1a034590339082b9abce"
          	}
          }
        },
       "id": "0B3358C1-BA4B-4186-8795-9024203EB7DD",
       "key": "0B3358C1-BA4B-4186-8795-9024203EB7DD",
       "value": {
        "rev": "1-5782E71F1E4BF698FA3793D9D5A96393"
       }
     }]
  })
}

function getFriend(id, callback) {
  return callback(null, {
    ok: true,
    id: id,
    rev: "1-A09739A80B7509FFF837509F"
  })
}

///////////////////////////////////
//////   Circles DAL   ///////////
///////////////////////////////////

function createCircle(circle, callback) {
  const id = "circle_" + circle.title
  return callback(null, {
      ok: true,
      id: id,
      rev: "1-A09739A80B7509FFF837509F"
  })
}

function getCircle(id, callback) {
  callback(null, {
    "ok": true,
    "id": "circle_undefined",
    "rev": "1-A09739A80B7509FFF837509F"
  })
}

function updateCircle(circle, callback) {
  callback(null, {
    "ok": true,
    "id": "circle_undefined",
    "rev": "1-A09739A80B7509FFF837509F"
  })
}
function deleteCircle(id, callback) {
  callback(null, {
    "ok": true,
    "id": "circle_undefined",
    "rev": "1-A09739A80B7509FFF837509F"
  })
}

function listCircles(callback) {
  callback(null, {
      "offset": 0,
      "total_rows": 1,
      "rows": [{
        "doc": {
          "_id": "0B3358C1-BA4B-4186-8795-9024203EB7DD",
          "_rev": "1-5782E71F1E4BF698FA3793D9D5A96393",
          "title": "Sound and Vision",
          "_attachments": {
          	"attachment/its-id": {
          	  "content_type": "image/jpg",
          	  "data": "R0lGODlhAQABAIAAAP7//wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
          	  "digest": "md5-57e396baedfe1a034590339082b9abce"
          	}
          }
        },
       "id": "0B3358C1-BA4B-4186-8795-9024203EB7DD",
       "key": "0B3358C1-BA4B-4186-8795-9024203EB7DD",
       "value": {
        "rev": "1-5782E71F1E4BF698FA3793D9D5A96393"
       }
     }]
  })
}


///////////////////////////////////
//////   Restaurants DAL   ////////
///////////////////////////////////
function createRestaurant(restaurant, callback) {
  const id = "restaurant_" + restaurant._id
  callback(null, {
    ok: true,
    id: id,
    rev: "1-A23423423423423SFDS089"
  })
}

function getRestaurant(id, callback) {
  callback(null, {
    ok: true,
    id: "restaurant._id",
    rev: "1-A23423423423423SFDS089"
  })
}

function updateRestaurant(restaurant, callback) {
  callback(null, {
    ok: true,
    id: "restaurant._id",
    rev: "1-A23423423423423SFDS089"
  })
}

function deleteRestaurant(id, callback) {
  callback(null, {
    ok: true,
    id: "restaurant._id",
    rev: "1-A23423423423423SFDS089"
  })
}

function listRestaurants(callback) {
  callback(null, {
    "offset": 0,
    "total_rows": 1,
    "rows": [{
      "doc": {
        "_id": "0B3358C1-BA4B-4186-8795-9024203EB7DD",
        "_rev": "1-5782E71F1E4BF698FA3793D9D5A96393",
        "title": "Sound and Vision",
        "_attachments": {
          "attachment/its-id": {
            "content_type": "image/jpg",
            "data": "R0lGODlhAQABAIAAAP7//wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
            "digest": "md5-57e396baedfe1a034590339082b9abce"
          }
        }
      },
     "id": "0B3358C1-BA4B-4186-8795-9024203EB7DD",
     "key": "0B3358C1-BA4B-4186-8795-9024203EB7DD",
     "value": {
      "rev": "1-5782E71F1E4BF698FA3793D9D5A96393"
     }
   }]
  })
}

///////////////////////////////////
//////   Sessions DAL   ///////////
///////////////////////////////////

function createSession(session, callback) {
  callback(null, {
    ok: true,
    id: "session._id",
    rev: "1-A23423423423423SFDS089"
  })
}

function getSession(id, callback) {
  callback(null, {
    "ok": true,
    "id": "session._id",
    "rev": "1-A23423423423423SFDS089"
  })
}

function updateSession(session, callback) {
  callback(null, {
    "ok": true,
    "id": "session._id",
    "rev": "1-A23423423423423SFDS089"
  })
}

function deleteSession(id, callback) {
  callback(null, {
    "ok": true,
    "id": "session._id",
    "rev": "1-A23423423423423SFDS089"
  })
}

function listSessions(callback) {
  callback(null, {
    "offset": 0,
    "total_rows": 1,
    "rows": [{
      "doc": {
        "_id": "0B3358C1-BA4B-4186-8795-9024203EB7DD",
        "_rev": "1-5782E71F1E4BF698FA3793D9D5A96393",
        "title": "Sound and Vision",
        "_attachments": {
          "attachment/its-id": {
            "content_type": "image/jpg",
            "data": "R0lGODlhAQABAIAAAP7//wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==",
            "digest": "md5-57e396baedfe1a034590339082b9abce"
          }
        }
      },
     "id": "0B3358C1-BA4B-4186-8795-9024203EB7DD",
     "key": "0B3358C1-BA4B-4186-8795-9024203EB7DD",
     "value": {
      "rev": "1-5782E71F1E4BF698FA3793D9D5A96393"
     }
    }]
  })
}



module.exports = dal
