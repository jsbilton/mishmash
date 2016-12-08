const React = require('react')
const { Link } = require('react-router')
const SessionForm = React.createClass({
  render() {
    return (
      <div>
        <h1>Session Form Page</h1>
        <div>
          <form action="">
            <label htmlFor=""></label>
            <input type="text"/>
            <div>
              <button>Submit</button>
            </div>
          </form>
          <Link to='/sessions'>Return to Sessions List</Link>
        </div>
      </div>
    )
  }
})
module.exports = SessionForm
