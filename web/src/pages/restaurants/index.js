const React = require('react')
const data = require('../../utils/data')()
const { Link } = require('react-router')
const { map } = require('ramda')
const Restaurants = React.createClass({
  getInitialState() {
    return {
      restaurants: []
    }
  },
  componentDidMount() {
    data.list('restaurants')
    .then(restaurants => {
      this.setState({
        restaurants: restaurants.rows
      })
    })
    .catch(err => console.log("error", err.message))
  },
  render () {
    const transform = map(rest => {
      return <div key={rest.doc.name}>
        <Link to={`/restaurants/${rest.id}/show`}>{rest.doc.name}</Link>
      </div>
    })
    return (
      <div>
        <h1>Restaurants List</h1>
        <Link to='/restaurants/new'>New Restaurant</Link>
        <ul>
          {transform(this.state.restaurants)}
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
