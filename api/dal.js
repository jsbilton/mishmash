const path = require('path')
const PouchDB = require('pouchdb-http')
PouchDB.plugin(require('pouchdb-mapreduce'))
const fetchConfig = require('zero-config')

var config = fetchConfig(path.join(__dirname, '..'), {
  dcValue: 'test'
})
const urlFormat = require("url").format
const db = new PouchDB(config.get("cloudant"))

const dal = {

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


/////     List Docs    ////////
function listDocs(sortBy, startKey, limit, callback) {
  if (typeof startkey == 'undefined' || startkey === null) {
    return callback(new Error('Missing search parameter'))
  } else if (typeof limit == 'undefined' || limit === null) {
    return callback (new Error('Missing limit parameter'))
  } else {


         db.query(sortBy, {
           include_docs: true,
           startkey: startKey,
           limit: limit
         }, function(err, data) {
           if (err) return callback(err)
           if (startKey !== '') data.rows.shift()
           callback(null, data)
         })
   }
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


//////   Update Doc   /////////////
function updateDoc(data, callback) {
  if (typeof data === 'undefined' || data === null) {
    return callback(new Error('400Missing data for update'))
  } else if (data.hasOwnProperty('_id') !== true) {
      return callback(new Error('400Missing id for update'))
  } else if (data.hasOwnProperty('_rev') !== true ) {
    return callback(new Error('400Missing rev for update'))
  } else {


      db.put(data).then(function(response) {
        return callback(null, response)
      }).catch(function(err) {
          return callback(err)
      })
  }
}



//////   Delete Doc   /////////////
function deleteDoc (data, callback) {
  if (typeof data === 'undefined' || data === null) {
    return callback(new Error('400Missing data for delete'))
  } else if (data.hasOwnProperty('_id') !== true) {
      return callback(new Error('400Missing id property from delete'))
  } else if (data.hasOwnProperty('_rev') !== true) {
      return callback(new Error('400Missing rev property from delete'))
  } else {

      db.remove(data, function(err, response) {
        if (err) return callback(err)
        if (response) return callback(null, response)
      })
  }
}

//////   Get Doc   /////////////
function getDocById(id, callback) {
  if (typeof id === 'undefined' || id === null) {
    return callback(new Error('400Missing id parameter'))
  } else {
  db.get(id, function(err, data) {
    if (err) return callback(err)
    if (data) return callback(null, data)
   })
  }
}

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

// function createFriend(friend, callback) {
// // send this back to the caller via the callback (from pouch)
//   // {
//   //   "ok": true,
//   //   "id": "",
//   //   "rev": ""
//   // }
// // need an object to create our response
// // mocking up db call
//
//
// // db.put({
// //   _id: "friend_" + friend.email,
// //   title: ""
// // }).then(function(response) {
// //
// // })
//
//   const id = "friend_" + friend.email
//
//   const friendResponse = {
//     ok: true,
//     id: id,
//     rev: "1-A09739A80B7509FFF837509F"
//   }
// // how do we get that back to the callback and say success
//   return callback(null, friendResponse)
// }

function createFriend(friend, callback) {
  if (typeof friend === 'undefined' || friend === null) {
    return callback(new Error('400Missing friend for create circle'))
} else if (friend.hasOwnProperty('_id') !== true) {
    return callback(new Error('400Unnecessary id property for create friend'))
} else if (friend.hasOwnProperty('_rev') !== true) {
    return callback(new Error('400Unnecessary rev property for create friend'))
} else if (friend.hasOwnProperty('name') === true) {
    return callback(new Error('400Missing name for create circle'))
} else if (friend.hasOwnProperty('phone') === true) {
    return callback(new Error('400Missing phone for create circle'))
} else if (friend.hasOwnProperty('email') === true) {
    return callback(new Error('400Missing email for create circle'))
} else {

      friend.type = 'friend_'
      friend._id = 'friend_' + friend.email

      db.put(friend).then(function(response) {
        return callback(null, response)
      }).catch(function(err) {
        return callback(err)
      })

  }
}

function deleteFriend(id, callback) {
  deleteDoc(id, callback)
}

function updateFriend(data, callback) {
  updateDoc(data, callback)
}

function getFriend(id, callback) {
  getDocById(id, callback)
}

function listFriends(callback) {
      const sortBy = 'circles'
      const sortToken = ''
      const limit = 10
      listDocs(sortBy, sortToken, limit, (e, r) => {
        if (e) callback(e, null)
        callback(null, r)
      })
}



///////////////////////////////////
//////   Circles DAL   ///////////
///////////////////////////////////

// function createCircle(circle, callback) {
//   const id = "circle_" + circle.title
//   return callback(null, {
//       ok: true,
//       id: id,
//       rev: "1-A09739A80B7509FFF837509F"
//   })
// }

function createCircle(circle, callback) {
  if (typeof circle === 'undefined' || circle === null) {
    return callback(new Error('400Missing circle for create circle'))
  } else if (circle.hasOwnProperty('_id') === true) {
      return callback(new Error('400Unnecessary id property for create circle'))
  } else if (circle.hasOwnProperty('_rev') === true) {
      return callback(new Error('400Unnecessary rev property for create circle'))
  } else if (circle.hasOwnProperty('title') !== true) {
      return callback(new Error('400Missing title for create circle'))
  } else {

///  defaults properites if success
      circle.type = 'circle'
      circle._id = 'circle_' + circle.title
      circle.isDefault = false

      db.put(circle).then(function(response) {
        return callback(null, response)
      }).catch(function(err) {
        return callback(err)
      })
   }

}

function getCircle(id, callback) {
  getDocById(id, callback)
}

function updateCircle(circle, callback) {
  updateDoc(circle, callback)
}
function deleteCircle(id, callback) {
  deleteDoc(circle, callback)
}

function listCircles(callback) {
      const sortBy = 'circles'
      const sortToken = ''
      const limit = 10
      listDocs(sortBy, sortToken, limit, (e, r) => {
        if (e) callback(e, null)
        callback(null, r)
      })
}

///////////////////////////////////
//////   Restaurants DAL   ////////
///////////////////////////////////
function createRestaurant(data, callback) {
  const id = "restaurant_" + restaurant._id
  callback(null, {
    ok: true,
    id: id,
    rev: "1-A23423423423423SFDS089"
  })
}

function getRestaurant(id, callback) {
  getDocById(id, callback)
}

function updateRestaurant(data, callback) {
  updateDoc(data, callback)
}

function deleteRestaurant(id, callback) {
  deleteDoc(id, callback)
}

function listRestaurants(callback) {
      const sortBy = 'circles'
      const sortToken = ''
      const limit = 10
      listDocs(sortBy, sortToken, limit, (e, r) => {
        if (e) callback(e, null)
        callback(null, r)
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
  getDocById(id, callback)
}

function updateSession(data, callback) {
  updateDoc(data, callback)
}

function deleteSession(id, callback) {
  deleteDoc(id, callback)
}

function listSessions(callback) {
      const sortBy = 'circles'
      const sortToken = ''
      const limit = 10
      listDocs(sortBy, sortToken, limit, (e, r) => {
        if (e) callback(e, null)
        callback(null, r)
      })
}


module.exports = dal
