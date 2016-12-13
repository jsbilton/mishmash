const React = require('react')
const { Link } = require('react-router')
const { map } = require('ramda')
const { Button } = require('react-bootstrap')
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
    const transform = map(c => {
      return <div key={c.doc.title}><Link to={`/circles/${c.id}/show`}>{c.doc.title}</Link>
    </div>
  })
    return (
      <div>
        <h1>Circles</h1>
          <Link to="/circles/new">{(params) => <Button {...params}>Add A Circle</Button>}</Link>
          <ul>
            {transform(this.state.circles)}
          </ul>
          <Link to='/circles'>Return to Circles</Link>
          |
          <Link to='/'>Return to App Resource</Link>
          <pre>
            {JSON.stringify(this.state, null, 2)}
          </pre>
      </div>
    )
  }
})

module.exports = Circles
