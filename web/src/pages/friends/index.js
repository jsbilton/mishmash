const React = require('react')
const { Link } = require('react-router')
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
    const li = friend => <li key={friend.doc.name}>{friend.doc.name}</li>
    return (
      <div>
        <h1>Say hello to my little friends</h1>
        <Link to='/friends/new'>New Friend</Link>
        <ul>
          {this.state.friends.map(li)}
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
