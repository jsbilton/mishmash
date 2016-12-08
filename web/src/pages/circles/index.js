const React = require('react')
const { Link } = require('react-router')
const data = require('../../utils/data')()
// const { pluck } = require('ramda')
const Circles = React.createClass({
  getInitialState() {
    return {
      circles: []
    }
  },
  componentDidMount() {
    data.list('circles')
      .then(circles => {
        console.log(circles)
        this.setState({circles: circles.rows})
      })
      .catch(err => console.log("error", err.message))
  },
  render() {
    const li = circle => <li key={circle.id}>{circle.title}</li>
    return (
      <div>
        <h1>Circles</h1>
        <Link to='/circles/new'>New Circle</Link>
          <ul>
            {this.state.circles.map(li)}
          </ul>
          <Link to='/circles'>Return to Circles</Link>
      </div>
    )
  }
})

module.exports = Circles
