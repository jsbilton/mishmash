const PouchDB = require('pouchdb')

// const db = new PouchDB('http://127.0.0.1:5984/lunch/')
const db = new PouchDB(urlFormat(config.get('cloudant')))

var friends = [
    {
        "_id": "friend_lulubills@gmail.com",
        "type": "friend",
        "first": "Lulu Bilton",
        "phone": "843.478.1189",
        "email": "lulubills@gmail.com",
        "preference": [
            {
                "prefType": "favorite",
                "name": "restaurant_Hanibals_29401",
                "rating": 2,
                "price_rating": 4
            }
        ]
    }, {
        "_id": "friend_ozzy@gmail.com",
        "type": "friend",
        "name": "Ozzy Bilton",
        "phone": "843.478.1187",
        "email": "ozzy@gmail.com",
        "preference": [
            {
                "prefType": "favorite",
                "name": "restaurant_Martha_Lou's_Kitchen_29401",
                "rating": 1,
                "price_rating": 4
            }
        ]
    }, {
        "_id": "friend_suz@gmail.com",
        "type": "friend",
        "name": "Suz Bilton",
        "phone": "843.478.0101",
        "email": "suz@gmail.com",
        "preference": [
            {
                "prefType": "favorite",
                "name": "restaurant_FIG_29401",
                "rating": 1,
                "price_rating": 1
            }
        ]
    }, {
        "_id": "friend_janice@gmail.com",
        "type": "friend",
        "name": "Janice Johnson",
        "phone": "901.728.8151",
        "email": "janice@gmail.com",
        "preference": [
            {
                "prefType": "blocked",
                "name": "restaurant_Hyman's_Seafood_29401",
                "rating": 4,
                "price_rating": 1
            }
        ]
    }, {
        "_id": "friend_spank@gmail.com",
        "type": "friend",
        "name": "Frank Atkinson",
        "phone": "803.714.9453",
        "email": "spank@gmail.com",
        "preference": [
            {
                "prefType": "blocked",
                "name": "restaurant_Fleet_Landing",
                "rating": 3,
                "price_rating": 3
            }
        ]
    }, {
        "_id": "friend_traveller@gmail.com",
        "type": "friend",
        "name": "Chris Stapleton",
        "phone": "865.828.1430",
        "email": "traveller@gmail.com",
        "preference": [
            {
                "prefType": "favorite",
                "name": "restaurant_Husk_29401",
                "rating": 1,
                "price_rating": 1
            }
        ]
    }, {
        "_id": "friend_biltons@gmail.com",
        "type": "friend",
        "name": "Barbara Bilton",
        "phone": "843.563.9453",
        "email": "biltons@gmail.com",
        "preference": [
            {
                "prefType": "favorite",
                "name": "restaurant_California_Dreaming_29412",
                "rating": 2,
                "price_rating": 3
            }
        ]
    }, {
        "_id": "friend_jerry@gmail.com",
        "type": "friend",
        "name": "Jerry Garcia",
        "phone": "914.828.1942",
        "email": "jerry@gmail.com",
        "preference": [
            {
                "prefType": "favorite",
                "name": "restaurant_Husk_29401",
                "rating": 2,
                "price_rating": 1
            }
        ]
    }
]

db.bulkDocs(friends, (err, res) => {
    if (err)
        return console.log(err.message)
    console.log(res)
})
