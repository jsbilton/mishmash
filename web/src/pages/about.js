const React = require('react')
const { Link } = require('react-router')
const { ButtonToolbar, Button } = require('react-bootstrap')

const About = React.createClass({
  render() {
     return (
         <div>
             <h1>About</h1>
             <Link to="/about">{
          (params) => <Button {...params}>About</Button>}
            </Link>
         </div>
      )
  }
})

module.exports = About
