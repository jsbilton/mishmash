const React = require('react')
const { Link } = require('react-router')
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
      <div>
        <h1>Say hello to my little friends</h1>
        <Link to='/friends/new'>New Friend</Link>
          <ul>
            {transform(this.state.friends)}
          </ul>
          <Link to='/friends'>Return to Friend List: This Page</Link>
          |
          <Link to='/'>Return to App Resource</Link>
        <pre>
          {JSON.stringify(this.state, null, 2)}
        </pre>
      </div>
    )
  }
})

module.exports = Friends
