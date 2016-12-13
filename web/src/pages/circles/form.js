const React = require('react')
const labelStyle = { display: 'block' }
const { FormGroup, FormControl, ControlLabel, HelpBlock, Button } = require('react-bootstrap')

const data = require('../../utils/data')()
const { Link, Redirect } = require('react-router')
const CircleForm = React.createClass({
  getInitialState() {
    return {
      circle: {
        title: '',
        // friends: []
      },
      resolved: false
    }
  },
  componentDidMount() {
    if (this.props.params.id) {
      data.get('circles', this.props.params.id)
      .then(circle => this.setState({circle}))
    }
  },
  handleChange(field) {
    return (e) => {
      let circle = {...this.state.circle}
      circle[field] = e.target.value
      this.setState({circle})
    }
  },
  handleSubmit (e) {
   e.preventDefault()
   if (!this.state.circle._id) {
       data.post('circles', this.state.circle)
       .then(res => this.setState({ resolved: true }))
   } else {
       data.put('circles', this.state.circle._id, this.state.circle)
       .then(res => this.setState({ resolved: true}))
   }
 },
  render() {
    const formState = this.state.circle._id ? 'Edit' : 'New'
    return (
      <div>
        {this.state.resolved ? <Redirect to='/circles' /> : null }
        <h1>{formState} Circle Form</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <FormGroup>
              <ControlLabel style={labelStyle}>Name</ControlLabel>
              <FormControl
                value={this.state.circle.title}
                onChange={this.handleChange('title')}
                type="text"/>
                <HelpBlock>Select a Circle or Create a New One</HelpBlock>
            </FormGroup>
            {/* <FormGroup>
              <ControlLabel style={labelStyle}>Friends</ControlLabel>
              <FormControl
                value={this.state.circle.friends}
                onChange={this.handleChange('friends')}
                type="text"/>
                  <HelpBlock>Friends will populate based on Circle selection above</HelpBlock>
            </FormGroup> */}
            <div>
             <label htmlFor="">Friends</label>
               <select name="" id="">
                 <option value="friend_email">Friends</option>
                 <option value="friend_janice@gmail.com">Janice Johnson</option>
                 <option value="friend_traveller@gmail.com">Chris Stapleton</option>
                 <option value="friend_jerry@gmail.com">Jerry Garcia</option>
               </select>
            </div>
            <div>
              <div>
                <Button>Submit</Button>
              </div>
            </div>
          </form>
          <Link to='/circles'>Return</Link>
        </div>
      </div>
    )
  }
})

module.exports = CircleForm
