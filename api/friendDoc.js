app.post('/friends')

// just necessary data
{
  "name": "Lulu Bilton",
  "phone": "843.478.1189",
  "email": "lulubills@gmail.com",
  "preference": [{

  }
  ]
}


app.get('/friends')
list
return back a JSON object and inside [of friends objects{friend 1, friend 2} ] going to get back id, type and rev also becuase of couch ..modeling what we want to see --> "doc" info id, rev, age, firstName, lastName but dont need it all

{
  [
    {
      friend: {
        "name": "Jared Bilton",
        "phone": "843.478.1188",
        "email": "jsbilton@gmail.com",
        "preference": [
            {
                "prefType": "favorite",
                "name": "restaurant_Hanibals_29401",
                "rating": 2,
                "price_rating": 4
            }
        ]
      },
        "name": "Neil Diamond",
        "phone": "555.555.5555",
        "email": "diamonds@gmail.com",
        "preference": [
            {
                "prefType": "favorite",
                "name": "restaurant_Hanibals_29401",
                "rating": 2,
                "price_rating": 4
            }
        ]
    }
  ]
}
