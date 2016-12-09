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
//////     Response Error      ///////
///////////////////////////////////

function BuildResponseError(err) {


    // no sql error message example
    //     { id: 'person_jackiekennedyo1922@gmail.org',
    // error: 'conflict',
    // reason: 'Document update conflict.',
    // name: 'conflict',
    // status: 409,
    // message: 'Document update conflict.',
    // ok: true }
    //
    // // custom DAL validation message example
    //
    // {
    // error: 'Bad Request',
    // reason: 'Unnecessary _id property within data.'
    // name: 'Bad Request',
    // status: 400,
    // message: 'Unnecessary _id property within data.',
    // ok: true }

    const statuscheck = isNaN(err.message.substring(0, 3)) === true ? "400" : err.message.substring(0, 3)
    const status = err.status ? Number(err.status) : Number(statuscheck)
    const message = err.status ? err.message : err.message.substring(3)
    const reason = message
    const error = status === 400 ? "Bad Request" : err.name
    const name = error

    var errormsg = {}
    errormsg.error = error
    errormsg.reason = reason
    errormsg.name = name
    errormsg.status = status
    errormsg.message = message


    //   { error: 'Bad Request',
    // reason: 'Missing email property within data',
    // name: 'Bad Request',
    // status: 400,
    // message: 'Missing email property within data' }
    console.log("BuildResponseError-->", errormsg)
    return errormsg
}

///////////////////////////////////
//////     Friends Api      ///////
///////////////////////////////////

////  Create a friend  ///

app.post('/friends', function(req, res, next) {
  console.log(req.body)
  dal.createFriend(req.body, function(err, result) {
    if (err)  {

      const responseError = BuildResponseError(err)
      return next(new HTTPError(responseError.status, responseError.message, responseError))
    }
    if (result) {
      console.log("POST", req.path, result)
      res.append("Content-type", "application/json")
      res.status(201).send(result)
    }
  })
})

///  Retrieve List of friends  ///
app.get('/friends', function(req, res, next) {
  dal.listFriends(function(err, result) {
    if (err)  {

      const responseError = BuildResponseError(err)
      return next(new HTTPError(responseError.status, responseError.message, responseError))
    }
    if (result) {
      console.log("GET", req.path, result)
      res.append("Content-type", "application/json")
      res.status(200).send(result)
    }
  })
})

///  Retrieve a friend  ///
app.get('/friends/:id', function(req, res, next) {

  const friendId = req.params.id

  dal.getFriend(friendId, function(err, result) {
    if (err)  {
      const responseError = BuildResponseError(err)
      return next(new HTTPError(responseError.status, responseError.message, responseError))
    }
    if (result) {
      console.log("GET", req.path, result)
      res.append("Content-type", "application/json")
      res.status(200).send(result)
    }
  })
})

///  Delete friend  ///
/// have to include the id and rev in postman so it deletes the correct id and version
  app.delete('/friends/:id', function(req, res, next) {

    const friendId = req.params.id

    dal.getFriend(friendId, function callback(err, result) {
      if (err)  {
        const responseError = BuildResponseError(err)
        return next(new HTTPError(responseError.status, responseError.message, responseError))
      }
      if (result) {
        dal.deleteFriend(result, function callback(deleteErr, deletedFriend) {
          if (deleteErr)  {
            const responseError = BuildResponseError(deleteErr)
            return next(new HTTPError(responseError.status, responseError.message, responseError))
          }
          if (deletedFriend) {
            console.log("DELETE", req.path, deletedFriend)
            res.append("Content-type", "application/json")
            res.status(200).send(deletedFriend)
          }
        })
      }
  })
})


app.put('/friends/:id', function(req, res, next) {
  dal.updateFriend(req.body, function(err, result) {

    if (err)  {
      const responseError = BuildResponseError(err)
      return next(new HTTPError(responseError.status, responseError.message, responseError))
    }
    if (result) {
      console.log("PUT", req.path, result)
      res.append("Content-type", "application/json")
      res.status(200).send(result)
    }
  })
})
//update will need id and rev could do friend._id and friend_.rev if choose

///////////////////////////////////
//////     Circles Api      ///////
///////////////////////////////////

///   Create Circle   ////

app.post('/circles', function(req, res, next) {

  dal.createCircle(req.body, function(err, result) {
    if (err)  {
      const responseError = BuildResponseError(err)
      return next(new HTTPError(responseError.status, responseError.message, responseError))
    }
    if (result) {
      console.log("POST", req.path, result)
      res.append("Content-type", "application/json")
      res.status(201).send(result)
    }
  })
})

///   Retrieve Circle   ////

app.get('/circles/:id', function(req, res, next) {
  dal.getCircle(req.params.id, function(err, result) {
    if (err)  {
      const responseError = BuildResponseError(err)
      return next(new HTTPError(responseError.status, responseError.message, responseError))
    }
    if (result) {
      console.log("GET", req.path, result)
      res.append("Content-type", "application/json")
      res.status(200).send(result)
    }
  })
})

///   Update Circle   ////

app.put('/circles/:id', function(req, res, next) {
  dal.updateCircle(req.body, function(err, result) {
    if (err)  {
      const responseError = BuildResponseError(err)
      return next(new HTTPError(responseError.status, responseError.message, responseError))
    }
    if (result) {
      console.log("PUT", req.path, result)
      res.append("Content-type", "application/json")
      res.status(201).send(result)
    }
  })
})


///   Delete Circle   ////

app.delete('/circles/:id', function(req, res, next) {
  dal.deleteCircle(req.params.id, function(err, result) {
    if (err)  {
      const responseError = BuildResponseError(err)
      return next(new HTTPError(responseError.status, responseError.message, responseError))
    }
    if (result) {
      console.log("DELETE", req.path, result)
      res.append("Content-type", "application/json")
      res.status(200).send(result)
    }
  })
})

///   List Circle   ////

app.get('/circles', function(req, res, next) {
  dal.listCircles(function(err, result) {
    if (err)  {
      const responseError = BuildResponseError(err)
      return next(new HTTPError(responseError.status, responseError.message, responseError))
    }
    if (result) {
      console.log("PUT", req.path, result)
      res.append("Content-type", "application/json")
      res.status(201).send(result)
    }
  })
})

///////////////////////////////////
//////     Restaurants Api   //////
///////////////////////////////////

///   Create Restaurants   ////

app.post('/restaurants', function(req, res, next) {

  dal.createRestaurant(req.body, function(err, result) {
    if (err)  {
      const responseError = BuildResponseError(err)
      return next(new HTTPError(responseError.status, responseError.message, responseError))
    }
    if (result) {
      console.log("POST", req.path, result)
      res.append("Content-type", "application/json")
      res.status(201).send(result)
    }
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
    if (err)  {
      const responseError = BuildResponseError(err)
      return next(new HTTPError(responseError.status, responseError.message, responseError))
    }
    if (result) {
      console.log("POST", req.path, result)
      res.append("Content-type", "application/json")
      res.status(201).send(result)
    }
  })
})

///   Retrieve Session   ////

app.get('/sessions/:id', function(req, res, next) {
  dal.getSession(req.params.id, function(err, result) {
    if (err)  {
      const responseError = BuildResponseError(err)
      return next(new HTTPError(responseError.status, responseError.message, responseError))
    }
    if (result) {
      console.log("GET", req.path, result)
      res.append("Content-type", "application/json")
      res.status(201).send(result)
    }
  })
})

///   Update Sessions   ////

app.put('/sessions/:id', function(req, res, next) {
  dal.updateSession(req.body, function(err, result){
    if (err)  {
      const responseError = BuildResponseError(err)
      return next(new HTTPError(responseError.status, responseError.message, responseError))
    }
    if (result) {
      console.log("PUT", req.path, result)
      res.append("Content-type", "application/json")
      res.status(200).send(result)
    }
  })
})
///   Delete Sessions   ////

app.delete('/sessions/:id', function(req, res, next) {
  dal.deleteSession(req.params.id, function(err, result) {
    if (err)  {
      const responseError = BuildResponseError(err)
      return next(new HTTPError(responseError.status, responseError.message, responseError))
    }
    if (result) {
      console.log("DELETE", req.path, result)
      res.append("Content-type", "application/json")
      res.status(200).send(result)
    }
  })
})

///   List Sessions   ////

app.get('/sessions', function(req, res, next) {
  dal.listSessions(function(err, result) {
    if (err)  {
      const responseError = BuildResponseError(err)
      return next(new HTTPError(responseError.status, responseError.message, responseError))
    }
    if (result) {
      console.log("GET", req.path, result)
      res.append("Content-type", "application/json")
      res.status(200).send(result)
    }
  })
})

// match any get that we do to any path and it will come back OK
app.get('*', (req, res) => res.send({
   ok: true
}))

//////////////////////
//   Error handler
//////////////////////

app.use(function(err, req, res, next) {
    console.log(req.method, " ", req.path, " err: ", err)
    res.status(err.status || 500)
    res.send(err);
})

// port listener
var server = http.createServer(app);
server.listen(port, () => console.log('opened server on', server.address()));
