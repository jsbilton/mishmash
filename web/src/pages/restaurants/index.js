const React = require('react')
const data = require('../../utils/data')()
const { Link } = require('react-router')
const Restaurants = React.createClass({
  getInitialState() {
    return {
      restaurants: []
    }
  },
  componentDidMount() {
    data.list('restaurants')
    .then(restaurants => {
      console.log(restaurants)
      this.setState({
        restaurants: restaurants.rows
      })
    })
    .catch(err => console.log("error", err.message))
  },
  render () {
    const li = restaurant => <li key={restaurant.doc.name}>{restaurant.doc.name}</li>
    return (
      <div>
        <h1>Restaurants List</h1>
        <Link to='/restaurants/new'>New Restaurant</Link>
        <ul>
          {this.state.restaurants.map(li)}
        </ul>
        <Link to='/restaurants'>Return to Restaurant List</Link>
        |
        <Link to='/'>Return to App Resource</Link>
        <pre>
          {JSON.stringify(this.state, null, 2)}
        </pre>
      </div>
    )
  }
})

module.exports = Restaurants
