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
    // data.list('circles')
    //   .then(rows => {
    //     const circles = pluck(doc, rows)
    //     this.setState({circles})
    data.list('circles')
      .then(circles => {
        console.log(circles)
        this.setState({circles: circles.rows})
      })
  },
  render() {
    const li = circle => <li key={circle.id}>{circle.name}</li>
    return (
      <div>
        <h1>Circles</h1>
        <Link to='/circles/new'>New Circle</Link>
          <ul>
            {this.state.circles.map(li)}
          </ul>
          <Link to='/circles'>Return</Link>
        
      </div>
    )
  }
})

module.exports = Circles
