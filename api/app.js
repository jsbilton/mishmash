const http = require('http')
const app = require('express')()
const cors = require('cors')
app.use(cors({ origin: true, credentials: true }))
const bodyParser = require('body-parser')
const HTTPError = require('node-http-error')
const port = process.env.PORT || 4000
const dal = require("./dal.js")

app.use(bodyParser.json())


///////////////////////////////////
//////     Friends Api      ///////
///////////////////////////////////

////  Create a friend  ///
app.post('/friends', function(req, res, next) {
  dal.createFriend(req.body, function(err, result) {
    res.status(201).send(result)
  })
})

///  Retrieve List of friends  ///
app.get('/friends', function(req, res, next) {
  dal.listFriends(function(err, result) {
    res.status(200).send(result)
  })
})

///  Retrieve a friend  ///
app.get('/friends/:id', function(req, res, next) {
  dal.getFriend(req.params.id, function(err, result) {
    res.status(200).send(result)
  })
})

///  Delete friend  ///
/// have to include the id and rev in postman so it deletes the correct id and version
  app.delete('/friends/:id', function(req, res, next) {
    dal.deleteFriend(req.params.id, function(err, result) {
      res.status(200).send(result)
    })
})

// once a delete is done you will get the following

// {
//   "ok": true,
//   "id": "mydoc",
//   "rev": "2-934958745937JK8907"
// }

///  Update friend  ///
app.put('/friends/:id', function(req, res, next) {
  dal.updateFriend(req.body, function(err, result) {
    res.status(200).send(result)
  })
})
//update will need id and rev could do friend._id and friend_.rev if choose

///////////////////////////////////
//////     Circles Api      ///////
///////////////////////////////////

///   Create Circle   ////

app.post('/circles', function(req, res, next) {
  dal.createCircle(req.body, function(err, result) {
    res.status(201).send(result)
  })
})

///   Retrieve Circle   ////

app.get('/circles/:id', function(req, res, next) {
  dal.getCircle(req.params.id, function(err, result) {
    res.status(200).send(result)
  })
})

///   Update Circle   ////

app.put('/circles/:id', function(req, res, next) {
  dal.updateCircle(req.body, function(err, result) {
    res.status(200).send(result)
  })
})


///   Delete Circle   ////

app.delete('/circles/:id', function(req, res, next) {
  dal.deleteCircle(req.params.id, function(err, result) {
    res.status(200).send(result)
  })
})

///   List Circle   ////

app.get('/circles', function(req, res, next) {
  dal.listCircles(function(err, result) {
    res.status(200).send(result)
  })
})

///////////////////////////////////
//////     Restaurants Api   //////
///////////////////////////////////

///   Create Restaurants   ////

app.post('/restaurants', function(req, res, next) {
  dal.createRestaurant(req.body, function(err, result) {
    res.status(201).send(result)
  })
})

///   Retrieve Restaurants   ////

app.get('/restaurants/:id', function(req, res, next) {
  dal.getRestaurant(req.params.id, function(err, result) {
    res.status(200).send(result)
  })
})

///   Update Restaurants   ////

app.put('/restaurants/:id', function(req, res, next) {
  dal.updateRestaurant(req.body, function(err, result) {
    res.status(200).send(result)
  })
})

///   Delete Restaurants   ////

app.delete('/restaurants/:id', function(req, res, next) {
  dal.deleteRestaurant(req.params.id, function(err, result) {
    res.status(200).send(result)
  })
})

///   List Restaurants   ////

app.get('/restaurants', function(req, res, next) {
  dal.listRestaurants(function(err, result) {
    res.status(200).send(result)
  })
})

///////////////////////////////////
//////     Sessions Api      //////
///////////////////////////////////

///   Create Session  ////

app.post('/sessions', function(req, res, next) {
  dal.createSession(req.body, function(err, result) {
    res.status(201).send(result)
  })
})

///   Retrieve Session   ////

app.get('/sessions/:id', function(req, res, next) {
  dal.getSession(req.params.id, function(err, result) {
    res.status(200).send(result)
  })
})

///   Update Sessions   ////

app.put('/sessions/:id', function(req, res, next) {
  dal.updateSession(req.body, function(err, result){
    res.status(200).send(result)
  })
})
///   Delete Sessions   ////

app.delete('/sessions/:id', function(req, res, next) {
  dal.deleteSession(req.params.id, function(err, result) {
    res.status(200).send(result)
  })
})

///   List Sessions   ////

app.get('/sessions', function(req, res, next) {
  dal.listSessions(function(err, result) {
    res.status(200).send(result)
  })
})

// match any get that we do to any path and it will come back OK
app.get('*', (req, res) => res.send({
   ok: true
}))


// port listener
var server = http.createServer(app);
server.listen(port, () => console.log('opened server on', server.address()));
