const PouchDB = require('pouchdb')

// const db = new PouchDB('http://127.0.0.1:5984/lunch/')
const db = new PouchDB(urlFormat(config.get('cloudant')))

var circles = [
    {
        "_id": "circle_classmates",
        "type": "circle",
        "title": "classmates",
        "isDefault": false,
        "friends": [
            {
                "friendId": "friend_ozzy@gmail.com"
            }
        ]
    }, {
        "_id": "circle_family",
        "type": "circle",
        "title": "family",
        "isDefault": false,
        "friends": [
            {
                "friendId": "friend_lulubills@gmail.com"
            }, {
                "friendId": "friend_suz@gmail.com"
            }, {
                "friendId": "friend_ozzy@gmail.com"
            }
        ]
    }, {
        "_id": "circle_co-workers",
        "type": "circle",
        "title": "co-workers",
        "isDefault": false,
        "friends": [
            {
                "friendId": "friend_spank@gmail.com"
            }, {
                "friendId": "friend_traveller@gmail.com"
            }
        ]
    }, {
        "_id": "circle_hoa",
        "type": "circle",
        "title": "hoa",
        "isDefault": false,
        "friends": [
            {
                "friendId": "friend_janice@gmail.com"
            }, {
                "friendId": "friend_Stapleton_Chris_traveller@gmail.com"
            }
        ]
    }, {
        "_id": "circle_lunchFriends",
        "type": "circle",
        "title": "lunchFriends",
        "isDefault": true,
        "friends": [
            {
                "friendId": "friend_janice@gmail.com"
            }, {

                "friendId": "friend_traveller@gmail.com"
            }, {
                "friendId": "friend_jerry@gmail.com"
            }
        ]
    }
]

db.bulkDocs(circles, (err, res) => {
    if (err)
        return console.log(err.message)
    console.log(res)
})
