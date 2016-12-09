const React = require('react')
const { Link, Redirect} = require('react-router')
const data = require('../../utils/data')()
const confirm = require('react-confirm2')
const Session = React.createClass({
  getInitialState() {
      return {
        session: {
          id: '',
          name: ''
        },
        removed: false
      }
  },
  handleRemove(e) {
    e.preventDefault()
    confirm('Are you sure you want to remove this Sessions?', () => {
      data.remove('sessions', this.props.params.id, this.state.session)
        .then(response => this.setState({removed: true}))
    })
  },
    render() {
        return (
            <div>
              {this.statet.removed ? <Redirect to='/sessions' /> : null }
                <h3>{this.state.session.id}</h3>
                <Link to={`/sessions/${this.state.session.id}/edit`}>Edit</Link>
                <a href="" onClick={this.handleRemove}>Remove</a>
                <Link to='/sessions'>Return to Sessions</Link>
            </div>
        )
    }
})

module.exports = Session
