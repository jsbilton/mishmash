const React = require('react')
const { Link, Redirect} = require('react-router')
const data = require('../../utils/data')()
const Confirm = require('../../components/confirm.js')
const Session = React.createClass({
  getInitialState() {
      return {
        session: '',
        resolved: false
      }
  },
  componentDidMount() {
    data.get('sessions', this.props.params.id)
    .then(session => this.setState({session}))
  },
  handleRemove(e) {
    e.preventDefault()
    this.setState({showconfirm: true})
  },
  handleConfirm(e) {
    data.remove('sessions', this.props.params.id, this.state.session)
      .then(res => {
        console.log(res)
        return res
      })
      .then(res => {
        this.setState({
          resolved: true,
          showconfirm: false
        })
      })
  },
  handleCancel(e) {
    this.setState({showconfirm: false})
  },
    render() {
        return (
            <div>
              {this.state.resolved ? <Redirect to='/sessions' /> : null }
              {this.state.showconfirm ?
                <Confirm
                  msg="Are you sure?"
                  onCancel={this.handleCancel}
                  onConfirm={this.handleConfirm} /> : null
              }
              {this.state.showconfirm ? null : <div><h1>Show</h1>
              <h3>{this.state.session._id}</h3>
              <nav>
                <Link to={`/sessions/${this.state.session._id}/edit`}>Edit</Link>
                <a href="#" onClick={this.handleRemove}>Remove</a>
                <Link to={`/sessions`}>Return to Sessions</Link>
                </nav>
              </div>
              }
              <pre>
                {JSON.stringify(this.state, null, 2)}
              </pre>

            </div>
        )
    }
})

module.exports = Session
