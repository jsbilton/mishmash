const React = require('react')
const data = require('../../utils/data')()
const { Link } = require('react-router')
const Sessions = React.createClass({
  getInitialState() {
    return {
      sessions: []
    }
  },
  componentDidMount() {
    data.list('sessions')
    .then(sessions => {
      this.setState({sessions: sessions.rows})
    })
    .catch(err => console.log("error", err.message))
  },
    render() {
      const li = session => <li key={session.id}>{session.name}</li>

        return (
            <div>
                <h1>Sessions List
                </h1>
                <Link to='/sessions/new'>New Session</Link>
                <ul>
                  {this.state.sessions.map(li)}
                </ul>
                <Link to='/sessions'>Return to sessions list</Link>
                |
                <Link to='/'>Return to App Resource</Link>
            </div>
        )
    }
})

module.exports = Sessions
