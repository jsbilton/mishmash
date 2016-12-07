const PouchDB = require('pouchdb')

const db = new PouchDB('https://cantops:cantops@cantops.cloudant.com/mishmash')


    var restaurants = [
        {
            "_id": "restaurant_Applebees_29464",
            "type": "restaurant",
            "name": "Applebees",
            "address": "1900 Johnnie Dodds Blvd",
            "city": "Mount Pleasant",
            "state": "SC",
            "postal_code": "29464",
            "phone": "843.881.9890",
            "price_rating": "4",
            "image_url": "http://www.fillmurray.com/50/50",
            "reservation_url": ""
        }, {
            "_id": "restaurant_FIG_29401",
            "type": "restaurant",
            "name": "FIG",
            "address": "900 Meeting Street",
            "city": "Charleston",
            "state": "SC",
            "postal_code": "29401",
            "phone": "843.971.5792",
            "price_rating": "1",
            "image_url": "http://www.fillmurray.com/50/50",
            "reservation_url": ""
        }, {
            "_id": "restaurant_Martha_Lou's_Kitchen_29401",
            "type": "restaurant",
            "name": "Martha Lou's Kitchen",
            "address": "910 Morrison Street",
            "city": "Charleston",
            "state": "SC",
            "postal_code": "29401",
            "phone": "843.971.4290",
            "price_rating": "4",
            "image_url": "http://www.fillmurray.com/50/50",
            "reservation_url": ""
        }, {
            "_id": "restaurant_Hanibals_29401",
            "type": "restaurant",
            "name": "Hanibals",
            "address": "89 Bogard Street",
            "city": "Charleston",
            "state": "SC",
            "postal_code": "29401",
            "phone": "843.971.2330",
            "price_rating": "4",
            "image_url": "http://www.fillmurray.com/50/50",
            "reservation_url": ""
        }, {
            "_id": "restaurant_Hyman's_Seafood_29401",
            "type": "restaurant",
            "name": "Hyman's Seafood",
            "address": "2099 Meeting Street",
            "city": "Charleston",
            "state": "SC",
            "postal_code": "29401",
            "phone": "843.971.8934",
            "price_rating": "1",
            "image_url": "http://www.fillmurray.com/50/50",
            "reservation_url": ""
        },
        {
            "_id": "restaurant_Husk_29401",
            "type": "restaurant",
            "name": "Husk",
            "address": "900 Queen Street",
            "city": "Charleston",
            "state": "SC",
            "postal_code": "29401",
            "phone": "843.971.0790",
            "price_rating": "1",
            "image_url": "http://www.fillmurray.com/50/50",
            "reservation_url": ""
        },
        {
            "_id": "restaurant_California_Dreaming_29412",
            "type": "restaurant",
            "name": "California Dreaming",
            "address": "1200 Harbor Causeway",
            "city": "Charleston",
            "state": "SC",
            "postal_code": "29412",
            "phone": "843.921.6940",
            "price_rating": "3",
            "image_url": "http://www.fillmurray.com/50/50",
            "reservation_url": ""
        },
        {
            "_id": "restaurant_Lewis_BBQ_29403",
            "type": "restaurant",
            "name": "Lewis BBQ",
            "address": "1100 Morrison Street",
            "city": "Charleston",
            "state": "SC",
            "postal_code": "29403",
            "phone": "843.923.2587",
            "price_rating": "2",
            "image_url": "http://www.fillmurray.com/50/50",
            "reservation_url": ""
        },
        {
            "_id": "restaurant_Home_Team_29403",
            "type": "restaurant",
            "name": "Home Team BBQ",
            "address": "1108 Morrison Street",
            "city": "Charleston",
            "state": "SC",
            "postal_code": "29403",
            "phone": "843.921.6536",
            "price_rating": "3",
            "image_url": "http://www.fillmurray.com/50/50",
            "reservation_url": ""
        },
        {
            "_id": "restaurant_Home_Team_29409",
            "type": "restaurant",
            "name": "Home Team BBQ",
            "address": "1223 Savannah Highway",
            "city": "Charleston",
            "state": "SC",
            "postal_code": "29409",
            "phone": "843.227.6536",
            "price_rating": "3",
            "image_url": "http://www.fillmurray.com/50/50",
            "reservation_url": ""
        },
        {
          "_id": "restaurant_Fleet_Landing_29401",
          "type": "restaurant",
          "name": "Fleet Landing",
          "address": "2 South Cumberland Street",
          "city": "Charleston",
          "state": "SC",
          "postal_code": "29401",
          "phone": "843.817.0031",
          "price_rating": "3",
          "image_url": "http://www.fillmurray.com/50/50",
          "reservation_url": ""

        }

    ]

    // const addDoc = function(item){
    //   db.put(item, (err,res) => {
    //     if(err) return console.log(err)
    //     console.log(res)
    //   })
    // }

    // restaurants.forEach(addDoc)


//or
     db.bulkDocs(restaurants, (err,res) => {
      if (err) return console.log(err.message)
      console.log(res)
    })
