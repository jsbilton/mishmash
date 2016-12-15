const React = require('react')
const { Link } = require('react-router')
const { Button } = require('react-bootstrap')

const { map } = require('ramda')
const data = require('../../utils/data')()
const Friends = React.createClass({
  getInitialState() {
    return {
      friends: []
    }
  },
  componentDidMount() {
    data.list('friends')
      .then(friends => {
        console.log(friends)
        this.setState({friends: friends.rows})
      })
      .catch(err => console.log("error", err.message))
  },
  render () {
    const transform = map(f => {
      return <li className="grow ph3 f3-ns dib br-2 pv3 bb b--light-silver" key={f.doc.name}><Link to={`/friends/${f.id}/show`}>{f.doc.name}</Link>
    </li>
  })
    return (
      <div className="tc">
        <h1 className="fw1 san francisco">Say hello to my little friends</h1>
        <Link to="/friends/new" className="f6 grow no-underline br-pill ba bw2 ph3 pv2 mb2 dib dark-blue" href="#0">Add A Friend</Link>
          <ul className="fw1 list pl0 shadow-5 ml0 center mw6 ba b--light-silver br2">
            {transform(this.state.friends)}
          </ul>
          {/* fw1 hover list pl0 ml0 center mw6 br2 link dim black dt hide-child ba b--black-20 pa4 br2 pointer" */}
      </div>

    )
  }
})

module.exports = Friends
