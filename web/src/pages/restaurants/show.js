const React = require('react')

const Restaurant = React.createClass({
  getInitialState() {
    return {
      restaurant: []
    }
  },
  render () {
    return (
      <div>
        <h1>{this.state.restaurant.name}</h1>
      </div>
    )
  }
})

module.exports = Restaurant
