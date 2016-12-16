const path = require('path')
const PouchDB = require('pouchdb-http')
PouchDB.plugin(require('pouchdb-mapreduce'))
const fetchConfig = require('zero-config')

var config = fetchConfig(path.join(__dirname, '..'), {
  dcValue: 'circle'
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
//////   Utility functions   ///////
///////////////////////////////////


/////     List Docs    ////////
function listDocs(sortBy, startKey, limit, callback) {
  // if (typeof startkey === 'undefined' || startkey === null) {
  //   return callback(new Error('Missing search parameter'))
  // } else if (typeof limit === 'undefined' || limit === null) {
  //   return callback(new Error('Missing limit parameter'))
  // } else if (typeof startKey === 'undefined' || startKey === null) {
  //   return callback(new Error('Missing startkey parameter'))
  // }
  // else {

         db.query(sortBy, {
           include_docs: true,
           startkey: startKey,
           limit: limit
         }, function(err, data) {
           if (err) return callback(err)
           if (startKey !== '') data.rows.shift()
           callback(null, data)
         })
  //  }
}

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

      db.remove(data).then(function(response) {
        return callback(null, response)
      }).catch(function(err) {
        return callback(err)
      })
  }
}

//////      Get Doc   /////////////
function getDocById(id, callback) {
  if (typeof id == 'undefined' || id === null) {
    return callback(new Error('400Missing id parameter'))
  } else {

      db.get(id).then(function(response) {
        return callback(null, response)
      }).catch(function(err) {
          return callback(err)
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

function createFriend(friend, callback) {
  if (typeof friend === 'undefined' || friend === null) {
    return callback(new Error('400Missing friend for create friend'))
} else if (friend.hasOwnProperty('_id') === true) {
    return callback(new Error('400Unnecessary id property for create friend'))
} else if (friend.hasOwnProperty('_rev') === true) {
    return callback(new Error('400Unnecessary rev property for create friend'))
} else if (friend.hasOwnProperty('name') !== true) {
    return callback(new Error('400Missing name for create friend'))
}  else if (friend.hasOwnProperty('email') !== true) {
    return callback(new Error('400Missing email for create friend'))
} else {

      friend.type = 'friend'
      friend._id = 'friend_' + friend.name.trim().split(' ').join('_') + friend.email.split(' ').join('_')

      db.put(friend).then(function(response) {
        return callback(null, response)
      }).catch(function(err) {
        return callback(err)
      })

  }
}

function deleteFriend(data, callback) {
  deleteDoc(data, callback)
}

function updateFriend(data, callback) {
  updateDoc(data, callback)
}

function getFriend(id, callback) {
  getDocById(id, callback)
}

function listFriends(callback) {
      const sortBy = 'friends'
      const sortToken = ''
      const limit = 30
      listDocs(sortBy, sortToken, limit, (e, r) => {
        if (e) callback(e, null)
        callback(null, r)
      })
}

///////////////////////////////////
//////   Circles DAL   ///////////
///////////////////////////////////

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
      circle._id = 'circle_' + circle.title.trim().split(' ').join('_')
      circle.isDefault = false
      circle.createdDate = new Date().toISOString()

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

function updateCircle(data, callback) {
  updateDoc(data, callback)
}

function deleteCircle(data, callback) {
  deleteDoc(data, callback)
}

function listCircles(callback) {
      const sortBy = 'circles'
      const sortToken = ''
      const limit = 40
      listDocs(sortBy, sortToken, limit, (e, r) => {
        if (e) callback(e, null)
        callback(null, r)
      })
}

///////////////////////////////////
//////   Restaurants DAL   ////////
///////////////////////////////////
function createRestaurant(restaurant, callback) {

  if (typeof restaurant === 'undefined' || restaurant === null) {
    return callback(new Error('400Missing restaurant for create restaurant'))
  } else if (restaurant.hasOwnProperty('_id') === true) {
      return callback(new Error('400Unnecessary id property for create restaurant'))
  } else if (restaurant.hasOwnProperty('_rev') === true) {
      return callback(new Error('400Unnecessary rev property for create restaurant'))
  } else if (restaurant.hasOwnProperty('name') !== true) {
      return callback(new Error('400Missing name for create restaurant'))
  } else if (restaurant.hasOwnProperty('postal_code') !== true) {
      return callback(new Error('400Missing postal code for create restaurant'))
  }  else {

     restaurant.type = 'restaurant'
     restaurant._id = 'restaurant_' + restaurant.name.trim().split(' ').join('_') +  restaurant.postal_code.trim().split(' ').join('_')


    db.put(restaurant).then(function(res) {
      return callback(null, res)
    }).catch(function(err) {
      return callback(err)
    })
  }
}

function getRestaurant(id, callback) {
  getDocById(id, callback)
}

function updateRestaurant(data, callback) {
  updateDoc(data, callback)
}

function deleteRestaurant(data, callback) {
  deleteDoc(data, callback)
}

function listRestaurants(callback) {
      const sortBy = 'restaurants'
      const sortToken = ''
      const limit = 40
      listDocs(sortBy, sortToken, limit, (e, r) => {
        if (e) callback(e, null)
        callback(null, r)
      })
}

///////////////////////////////////
//////   Sessions DAL   ///////////
///////////////////////////////////

function createSession(session, callback) {
  if (typeof session === 'undefined' || session === null) {
    return callback(new Error('400Missing session for create session'))
  } else if (session.hasOwnProperty('_id') === true) {
      return callback(new Error('400Unnecessary id property for create session'))
  } else if (session.hasOwnProperty('_rev') === true) {
      return callback(new Error('400Unnecessary rev property for create session'))
  } else if (session.hasOwnProperty('name') === true) {
      return callback(new Error('400Unnecessary name for create session'))
  } else {

        session.type = 'session'
        session._id = 'session_' + Date.now()


          db.put(session).then(function(res) {
            return callback(null, res)
          }).catch(function(err) {
            return callback(err)
          })
   }
}


function getSession(id, callback) {
  getDocById(id, callback)
}

function updateSession(data, callback) {
  updateDoc(data, callback)
}

function deleteSession(data, callback) {
  deleteDoc(data, callback)
}

function listSessions(callback) {
      const sortBy = 'sessions'
      const sortToken = ''
      const limit = 20
      listDocs(sortBy, sortToken, limit, (e, r) => {
        if (e) callback(e, null)
        callback(null, r)
      })
}


module.exports = dal
