const React = require('react')
const { Link } = require('react-router')
const Friends = React.createClass({
  getInitialState() {
    return {
      friends: []
    }
  },
  render () {
    const li = friend => <li key={friend.id}>{friend.name}</li>
    return (
      <div>
        <h1>Say hello to my little friends</h1>
        <Link to='/friends/new'>New Friend</Link>
        <ul>
          {this.state.friends.map(li)}
        </ul>
        <Link to='/'>Return to App Resource</Link>
      </div>
    )
  }
})

module.exports = Friends
