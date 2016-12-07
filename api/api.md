# API DOCS

## '/friends '

### 'GET /friends'

Retrieves a collection of friends as an array


**sample request**

```
GET /friends


{
    "_id": "friend_lulubills@gmail.com",
    "type": "friend",
    "name": "Lulu Bilton",
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
}

```

**sample response**

```

{
  "_id": "friend_lulubills@gmail.com",
  "_rev": "1-5caf4f9368bf3e13c1e43cbde7b79eae",
  "type": "friend",
  "name": "Lulu Bilton",
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
}

```


### 'GET /friends/:id'

Retrieves a single friend from a collection of friends


**sample request**

```
GET /friends/:id

{
    "_id": "friend_lulubills@gmail.com",
    "type": "friend",
    "name": "Lulu Bilton",
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
}


```

**sample response**

```
{
  "_id": "friend_lulubills@gmail.com",
  "_rev": "1-5caf4f9368bf3e13c1e43cbde7b79eae",
  "type": "friend",
  "name": "Lulu Bilton",
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
}

```

### 'POST /friends/:id'
Creates a new friend

**sample request**
```
```
**sample response**
```
```

### 'PUT /friends/:id'
Edits a friend

**sample request**
```
```
**sample response**
```
```
### 'DELETE /friends/:id'
Deletes a friend

**sample request**
```
```
**sample response**
```
```

## '/circles '
### 'GET /circles'
Retrieves a collection of circles as an array

**sample request**
```
```
**sample response**
```
```
### 'GET /circles/:id'
Retrieves a single circle from a collection of friends

**sample request**
```
```
**sample response**
```
```
### 'POST /circles/:id'
Creates a new circle

**sample request**
```
```
**sample response**
```
```
### 'PUT /circles/:id'
Edits a circle

**sample request**
```
```
**sample response**
```
```
### 'DELETE /circles/:id'
Deletes a circle

**sample request**
```
```
**sample response**
```
```

## '/restaurants '
### 'GET /restaurants'
Retrieves a collection of restaurants as an array

**sample request**
```
```
**sample response**
```
```
### 'GET /restaurants/:id'
Retrieves a single restaurant from a collection of friends

**sample request**
```
```
**sample response**
```
```
### 'POST /restaurants/:id'
Creates a new restaurant

**sample request**
```
```
**sample response**
```
```
### 'PUT /restaurants/:id'
Edits a restaurant

**sample request**
```
```
**sample response**
```
```
### 'DELETE /restaurants/:id'
Deletes a restaurant

**sample request**
```
```
**sample response**
```
```

## '/sessions '
### 'GET /sessions'
Retrieves a collection of sessions as an array

**sample request**
```
```
**sample response**
```
```
### 'GET /sessions/:id'
Retrieves a single session from a collection of friends

**sample request**
```
```
**sample response**
```
```
### 'POST /sessions/:id'
Creates a new session

**sample request**
```
```
**sample response**
```
```
### 'PUT /sessions/:id'
Edits a session

**sample request**
```
```
**sample response**
```
```
### 'DELETE /sessions/:id'
Deletes a session

**sample request**
```
```
**sample response**
```
```
