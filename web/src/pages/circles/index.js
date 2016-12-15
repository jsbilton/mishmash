const React = require('react')
const { Link } = require('react-router')
const { map } = require('ramda')
// const { Button } = require('react-bootstrap')
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
      return <li className="grow ph3 f3-ns dib br-2 pv3 bb b--light-silver" key={c.doc.title}><Link to={`/circles/${c.id}/show`}>{c.doc.title}</Link>
    </li>
  })
    return (
      <div className="tc">
        <h1 className="fw1 tc san francisco">Circles</h1>
          <Link to="/circles/new" className="f6 grow no-underline br-pill ba bw2 ph3 pv2 mb2 dib dark-blue" href="#0">Create A Circle</Link>
          <ul className="fw1 list pl0 shadow-5 ml0 center mw6 ba b--light-silver br2">
            {transform(this.state.circles)}
          </ul>
      </div>
    )
  }
})

module.exports = Circles
