const PouchDB = require('pouchdb')

// const db = new PouchDB('http://127.0.0.1:5984/lunch/')
const db = new PouchDB(urlFormat(config.get('cloudant')))
var sessions = [
    {
        "_id": "session_family",
        "type": "session",
        "circleId": "circle_family",
        "friendId": "friend_traveller@gmail.com",
        "time": new Date().toISOString(),
        "recommendations": [
            {
                "restaurantId": "restaurant_Husk_29401",
                "friendVote": [
                    {
                        "friendId": "friend_ozzy@gmail.com",
                        "vote": + 1,
                        "comment": "I love this place"
                    }, {
                        "friendId": "friend_lulubills@gmail.com",
                        "vote": + 1,
                        "comment": "Yeah, baby!"
                    }, {
                        "friendId": "friend_suz@gmail.com",
                        "vote": -1,
                        "comment": "Lets think of something a little more affordable, it is lunch js..."
                    }
                ],
                "matchRank": 3,
                "selectedRestaurant": true,
                "isCheckedIn": false
            }
        ]
    }, {
        "_id": "session_co-workers",
        "type": "session",
        "circleId": "circle_co-workers",
        "friendId": "friend_janice@gmail.com",
        "time": new Date().toISOString(),
        "recommendations": [
            {
                "restaurantId": "restaurant_Applebees_29464",
                "friendVote": [
                    {
                        "friendId": "friend_ozzy@gmail.com",
                        "vote": + 1,
                        "comment": "Lets do it! Bourbon Street Steak yall!"
                    }, {
                        "friendId": "friend_lulubills@gmail.com",
                        "vote": -1,
                        "comment": "Yeah, no!"
                    }, {
                        "friendId": "friend_suz@gmail.com",
                        "vote": -1,
                        "comment": "Lets think of something else, otherwise, meh"
                    }
                ],
                "matchRank": 3,
                "selectedRestaurant": true,
                "isCheckedIn": false
            }
        ]
    }, {
        "_id": "session_hoa",
        "type": "session",
        "circleId": "circle_hoa",
        "friendId": "friend_jerry@gmail.com",
        "time": new Date().toISOString(),
        "recommendations": [
            {
                "restaurantId": "restaurant_Home_Team_29403",
                "friendVote": [
                    {
                        "friendId": "friend_suz@gmail.com",
                        "vote": + 1,
                        "comment": "Yeah, I am always down for this"
                    }, {
                        "friendId": "friend_biltons@gmail.com",
                        "vote": + 1,
                        "comment": "Lets get some Q!"
                    }
                ],
                "matchRank": 3,
                "selectedRestaurant": true,
                "isCheckedIn": false
            }
        ]
    }, {
        "_id": "session_homies",
        "type": "session",
        "circleId": "circle_lunchFriends",
        "friendId": "friend_jerry@gmail.com",
        "time": new Date().toISOString(),
        "recommendations": [
            {
                "restaurantId": "restaurant_Martha_Lou's_Kitchen_29401",
                "friendVote": [
                    {
                        "friendId": "friend_suz@gmail.com",
                        "vote": + 1,
                        "comment": "Soul food"
                    }, {
                        "friendId": "friend_biltons@gmail.com",
                        "vote": + 1,
                        "comment": "Fried chicken!"
                    }, {
                        "friendId": "friend_spank@gmail.com",
                        "vote": + 1,
                        "comment": "Meat and three!"
                    }
                ],
                "matchRank": 3,
                "selectedRestaurant": true,
                "isCheckedIn": false
            }
        ]
    }
]
    db.bulkDocs(sessions, (err, res) => {
        if (err)
            return console.log(err.message)
        console.log(res)
    })
