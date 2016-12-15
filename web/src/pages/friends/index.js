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
      return <div key={f.doc.name}><Link to={`/friends/${f.id}/show`}>{f.doc.name}</Link>
    </div>
  })
    return (
      <div className="tc">
        <h1 className="fw1 san francisco">Say hello to my little friends</h1>
        <Link to="/friends/new" className="f6 grow no-underline br-pill ba bw2 ph3 pv2 mb2 dib dark-blue" href="#0">Add A Friend</Link>
          <ul>
            {transform(this.state.friends)}
          </ul>
      </div>

    )
  }
})

module.exports = Friends
