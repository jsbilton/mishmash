const React = require('react')
const data = require('../../utils/data')()
const { Link } = require('react-router')
const { Button } = require('react-bootstrap')
const { map } = require('ramda')
const Restaurants = React.createClass({
  getInitialState() {
    return {
      restaurants: []
    }
  },
  componentDidMount() {
    // change resource to different API
    //data.list('listRecommendations', this.props.params.id)
    data.list('restaurants')
    .then(restaurants => {
      this.setState({
        restaurants: restaurants.rows
      })
    })
    // data.listOpenTable('')
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
        <Link to="/restaurants/new">{(params) => <Button {...params}>Add A Restaurant</Button>}</Link>
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
