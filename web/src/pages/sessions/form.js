const React = require('react')
const { Redirect, Link } = require('react-router')
const { FormGroup, FormControl, ControlLabel, HelpBlock, Button } = require('react-bootstrap')
const data = require('../../utils/data')()
// const urlAPI = 'http://opentable.herokuapp.com/api/restaurants?zip={zip}'
const labelStyle = { display: 'block' }
const SessionForm = React.createClass({
  getInitialState () {
    return {
      session: {
      circles: [],
      restaurants: [],
      isDefault: false
    },
      resolved: false

    }
  },
  componentDidMount() {
    if (this.props.params.id) {
      data.get('sessions', this.props.params.id)
      .then(session => this.setState({session}))
    }
      data.list('circles')
      .then(circles => {
        this.setState({circles: circles.rows, isDefault: true})
      })
      .catch(err => console.log("error", err.message))
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
    const formState = this.state.session._id ? 'Edit' : 'New'
   return (
      <div>
        {this.state.resolved ? <Redirect to={`/sessions`} /> : null}
        {this.state.circles ?
          // zip code input
          <FormGroup>
            <ControlLabel>
              <FormControl
                onChange={this.handleChange}
                value={this.state.session.id}
              />
            </ControlLabel>
        </FormGroup> : null }

        <h1>{formState} Session Form</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            {/* <FormGroup>
              <ControlLabel style={labelStyle}>Name of Session</ControlLabel>
              <FormControl
                onChange={this.handleChange('name')}
                value={this.state.session.name}
                type="text"/>
                <HelpBlock>Must Provide a Session Name</HelpBlock>
            </FormGroup> */}
            <FormGroup>
              <ControlLabel style={labelStyle}>Name of the Circle</ControlLabel>
              <FormControl
                onChange={this.handleChange('circleId')}
                value={this.state.session.circleId}
                type="text"/>
                <HelpBlock>Select a Circle or choose Default Circle</HelpBlock>
            </FormGroup>
            <div>

            </div>
            {/* <FormGroup>
              <ControlLabel style={labelStyle}>Friend in Circle</ControlLabel>
              <FormControl
                onChange={this.handleChange('friendId')}
                value={this.state.session.friendId}
                type="text"/>
                <HelpBlock>These friends will populate based on the Circle Selection</HelpBlock>
            </FormGroup> */}
            <div className="link-to-api">
              <Link to="/restaurants">{(params) => <Button {...params}>Let's Eat! Redirect to OpenTable</Button>}
              </Link>
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
