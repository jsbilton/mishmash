const React = require('react')
const { Redirect, Link } = require('react-router')
const { FormGroup, FormControl, ControlLabel, ButtonToolbar, Button } = require('react-bootstrap')
const data = require('../../utils/data')()
const labelStyle = { display: 'block' }
const SessionForm = React.createClass({
  getInitialState () {
    return {
      session: '',
      resolved: false
    }
  },
  componentDidMount() {
    if (this.props.params.id) {
      data.get('sessions', this.props.params.id)
      .then(session => this.setState({session}))
    }
  },
  handleChange(field){
    return (e) => {
      let session = {...this.state.session}
      session[field]= e.target.value
      this.setState({session})
     }
  },
  handleSubmit(e) {
    e.preventDefault()
      if (!this.state.session._id) {
        data.post('sessions', this.state.session)
        .then(res =>  this.setState({resolved: true}))
      } else {
        data.put('sessions', this.state.session._id, this.state.session)
        .then(res => this.setState({ resolved: true}))
      }
  },
  render() {
    const formState = this.state.session._id ? 'Edit' : 'Name'
   return (
      <div>
        {this.state.resolved ? <Redirect to={`/sessions`} /> : null}
        <h1>{formState} Session Form</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <FormGroup>
              <ControlLabel style={labelStyle}>Name of Session</ControlLabel>
              <FormControl
                onChange={this.handleChange('name')}
                value={this.state.session.name}
                type="text"/>
            </FormGroup>
            <FormGroup>
              <ControlLabel style={labelStyle}>Name of the Circle</ControlLabel>
              <FormControl
                onChange={this.handleChange('circleId')}
                value={this.state.session.circleId}
                type="text"/>
            </FormGroup>
            <FormGroup>
              <ControlLabel style={labelStyle}>Friend in Circle</ControlLabel>
              <FormControl
                onChange={this.handleChange('friendId')}
                value={this.state.session.friendId}
                type="text"/>
            </FormGroup>

            <div>
              <ButtonToolbar>
                <Button>Submit</Button>
              </ButtonToolbar>
            </div>
          </form>
          <Link to='/sessions'>Return to Sessions List</Link>
        </div>
        <pre>
          {JSON.stringify(this.state, null, 2)}
        </pre>
      </div>
    )
  }
})
module.exports = SessionForm
