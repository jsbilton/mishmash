const React = require('react')
const { Link, Redirect} = require('react-router')
const data = require('../../utils/data')()
const confirm = require('react-confirm2')
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
      data.remove('sessions', this.props.params.id)
        .then(response => this.setState({resolved: true}))
  },
  handleConfirm(e) {
    data.remove('sessions', this.props.params.id, this.state.session)
      .then(res => {
        console.log(res)
        return res
      })
      .then(res => {
        this.setState({
          deleted: true,
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
              <h1>Show</h1>
              <h3>{this.state.session.id}</h3>
              <nav>
                <Link to={`/sessions/${this.state.session._id}/edit`}>Edit</Link>
                <a href="" onClick={this.handleRemove}>Remove</a>
                <Link to='/sessions'>Return to Sessions</Link>
              </nav>

            </div>
        )
    }
})

module.exports = Session
