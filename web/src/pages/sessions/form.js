const React = require('react')
const { Redirect, Link } = require('react-router')
const { Button } = require('react-bootstrap')
const data = require('../../utils/data')()
const { pluck, map } = require('ramda')
// const labelStyle = { display: 'block' }
const SessionForm = React.createClass({
  getInitialState () {
    return {
      // set defaults
      session: {
        circle: {},
        members: [],
        rating: 1
      },
      friends: [],
      circles: [],
      resolved: false
    }
  },
  componentDidMount() {

    // we dont need to name a session just a time stamp
    // new Date().toISOString()
    // if (this.props.params.id) {
    //   data.get('sessions', this.props.params.id)
    //   .then(session => this.setState({session}))
    // }
    // R.pluck('a')([{a: 1}, {a: 2}]); //=> [1, 2]
    data.list('friends')
    .then(friend => this.setState({
      friends: pluck("doc", friend.rows)}))

    data.list('circles')
    .then(circle => {
      console.log("circle stuff", circle.rows)
      this.setState({
        circles: pluck("doc", circle.rows)})
    })
    .catch(err => console.log("error", err.message))
  },
  handleChange(field){
    return (e) => {
      let session = {...this.state.session}
      session[field]= e.target.value
      this.setState({
        session
      })
     }
  },
  // handleSubmit(e) {
  //   e.preventDefault()
  //     if (!this.state.session._id) {
  //       data.post('sessions', this.state.session)
  //       .then(res =>  this.setState({resolved: true}))
  //     } else {
  //       data.put('sessions', this.state.session._id, this.state.session)
  //       .then(res => this.setState({ resolved: true}))
  //     }
  // },
  // handleSubmit(e) {
  //   e.preventDefault()
  //     if (!this.state.circle._id) {
  //       data.post('circles', this.state.circle)
  //       .then(res =>  this.setState({
  //         resolved: true
  //       }))
  //     } else {
  //       data.put('circles', this.state.circle._id, this.state.circle)
  //       .then(res => this.setState({
  //         resolved: true
  //       }))
  //     }
  // },
  handleSelectCircle(circle) {
    return e => {
      e.preventDefault()
      let session = {...this.state.session}
      session.circle.friends.map(friend => {
        return data.get('friends', friend._id)
        .then(response => session.members.unshift(response))
      })
      this.setState({session})
    }
  },
  handleSelectFriend(friend) {
    return e => {
      let session ={...this.state.session}
      session.members.unshift(friend)
      this.setState({session})
    }
  },
  render() {
    // no need to edit a session but will leave this & put in handleSubmit
    const formState = this.state.session._id ? 'Edit' : 'New'

    const transformCircles = (circle) => {
      return <div key={circle._id} onClick={this.handleSelectCircle(circle)}>{circle.title}</div>
    }
    const transformFriends = (friend) => {
      return <div key={friend._id} onClick={this.handleSelectFriend(friend)}>{friend.name}</div>
    }
    const transformMembers = (friend) => {
      return <div key={friend._id}>{friend.name}</div>
    }
   return (
      <div>
        {this.state.resolved ? <Redirect to={`/sessions`} /> : null}
        {/* {this.state.circles ?
          <FormGroup>
            <ControlLabel>
              <FormControl
                onChange={this.handleChange}
                value={this.state.session.id}
              />
            </ControlLabel>
        </FormGroup> : null } */}

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
            {/* <FormGroup>
              <ControlLabel style={labelStyle}>Name of the Circle</ControlLabel>
              <FormControl
                onChange={this.handleChange('circleId')}
                value={this.state.session.circleId}
                type="text"/>
                <HelpBlock>Select a Circle or choose Default Circle</HelpBlock>
            </FormGroup> */}
            <div>
              <h2>Individual Members Added from Friends List</h2>
                {map(transformMembers, this.state.session.members)}
              <h2>Existing Circles List</h2>
                {map(transformCircles, this.state.circles)}
            </div>
            <div>
              <h2>All Friends List</h2>
                {map(transformFriends, this.state.friends)}
            </div>
            {/* <div>
              {this.state.session.friendsId}
            </div> */}
            {/* <FormGroup>
              <ControlLabel style={labelStyle}>Friend in Circle</ControlLabel>
              <FormControl
                onChange={this.handleChange('friendId')}
                value={this.state.session.friendId}
                type="text"/>
                <HelpBlock>These friends will populate based on the Circle Selection</HelpBlock>
            </FormGroup> */}
            <div>
              <Button>Submit</Button>
            </div>
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
