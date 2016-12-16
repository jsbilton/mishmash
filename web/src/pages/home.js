const React = require('react')
const { Link } = require('react-router')

const Home = React.createClass({
  getInitialState() {
    return {
      default: ''
    }
  },
  componentDidMount() {
    if (!this.props.auth.loggedIn() &&
      this.props.location.hash.indexOf('access_token') === -1) {
      this.props.auth.login()
    }
  },
  render() {
     return (
         <div>
             <h1 className="fw1 san franciso">Home is Whenver I'm with You</h1>
             <Link to="/home">Home</Link>
             <Link to="/sessions/new">Start a Session</Link>
             <Link to="/circles">Get a Circle</Link>
             <Link to="/friends">Grab a Friend</Link>
         </div>
      )
  }
})

module.exports = Home
