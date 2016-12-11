const React = require('react')
const { map } = require('ramda')
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
      const transform = map(sess => {
        return <div key={sess.doc.name}>
          <Link to={`/sessions/${sess.id}/show`}>{sess.doc.name}</Link>
        </div>
      })

        return (
            <div>
                <h1>Sessions List
                </h1>
                <Link to='/sessions/new'>New Session</Link>
                <ul>
                  {transform(this.state.sessions)}
                </ul>
                <Link to='/sessions'>Return to sessions list</Link>
                |
                <Link to='/'>Return to App Resource</Link>
                <pre>
                  {JSON.stringify(this.state, null, 2)}
                </pre>
            </div>

        )
    }
})

module.exports = Sessions
