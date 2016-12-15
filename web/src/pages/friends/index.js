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
      <div>
        <h1 className="tc fw1 san francisco">Say hello to my little friends</h1>
        <Link to="/friends/new">{(params) => <Button {...params}>Add A Friend</Button>}</Link>
          <ul>
            {transform(this.state.friends)}
          </ul>
          <Link to='/friends'>Return to Friend List: This Page</Link>
          |
          <Link to='/'>Return to App Resource</Link>
      </div>
    )
  }
})

module.exports = Friends
