const fetch = require('isomorphic-fetch')
const toJSON = res => res.json()
const url = process.env.REACT_APP_API
// const urlAPI = 'http://opentable.herokuapp.com/api/restaurants?zip={zip}'

module.exports = function() {

  // const listRecommendations =
  //   fetch(urlAPI)
  //
  //     .then(toJSON)
  //     .then(results => results.Search
  //       ? this.setState({ results })
  //       : this.setState({error: results}))

  const list = (model) =>
    fetch(`${url}/${model}`)
      .then(toJSON)


  const post = (model, doc) =>
    fetch(`${url}/${model}`, {
      method: "post",
      body: JSON.stringify(doc),
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(toJSON)

  const get = (model, id) =>
    fetch(`${url}/${model}/${id}`)
      .then(toJSON)
      .then(response => {
        console.log(response)
        return response
      })

  const put = (model, id, doc) => fetch(`${url}/${model}/${id}`, {
      method: "put",
      body: JSON.stringify(doc),
      headers: {
        'Content-type': 'application/json'
      }
    }).then(toJSON)

    const remove = (model, id, doc) => fetch(`${url}/${model}/${id}`, {
       method: "delete",
       body: JSON.stringify(doc),
       headers: {
         'Content-type': 'application/json'
       }
     }).then(toJSON)

  return {
    // listRecommendations,
    list,
    post,
    get,
    remove,
    put
  }
}
