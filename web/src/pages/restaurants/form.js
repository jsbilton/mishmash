const React = require('react')
const { Link } = require('react-router')
const RestaurantForm = React.createClass({
  render () {
    return (
      <div>
        <h1>Restaurant Form</h1>
        <div>
          <form action="">
            <label htmlFor=""></label>
            <input type="text"/>
            <div>
              <button>Submit</button>
            </div>
          </form>
          <Link to='/restaurants'>Return to Restaurants List</Link>
        </div>
      </div>
    )
  }
})

module.exports = RestaurantForm
