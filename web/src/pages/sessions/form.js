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
        newCircle: {},
        members: [],
        circles: [],
        restaurants: []
      },
      friends: [],
      circles: [],
      resolved: false,
      newCircleFlag: false
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

    this.getCircles(false)
  },
  getCircles(circleIsNew) {
    let session = {...this.state.session}
    session.members = []
    data.list('circles')
    .then(circle => {
      // console.log("circle stuff", circle.rows)
      this.setState({
        newCircleFlag: !!circleIsNew,
        circles: pluck("doc", circle.rows),
        session: session
      })
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
  createSession(e) {
    // e.target.type === "session" should return true
    let thisSession = this.state.session
    // copy the new circle to the list of circles in this session
    thisSession.circles.push(thisSession.newCircle)
    // drop the new cricle before we save to db
    delete thisSession.newCircle

      if (!this.state.session._id) {
        data.post('sessions', thisSession)
        .then(res =>  this.setState({resolved: true}))
      } else {
        data.put('sessions', thisSession._id, thisSession)
        .then(res => this.setState({ resolved: true}))
      }
  },
  // came from circles form to post new/edit circle
  handleCircleSubmit(e) {
    e.preventDefault()
    let sessionCircle = this.state.session.newCircle
    sessionCircle.friends = this.state.session.members
    sessionCircle.title = 'test_' + new Date().toISOString()
      if (!sessionCircle._id) {
        data.post('circles', sessionCircle)
        .then(res => this.getCircles(true))
      } else {
        data.put('circles', sessionCircle.circle._id, sessionCircle)
        .then(res => this.getCircles(true))
      }
  },
  handleSelectCircle(circle) {
    return e => {
      let session = {...this.state.session}
      session.circles.unshift(circle)
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
    const transformMembers = (friend) => {
      return <div key={friend._id}>{friend.name}</div>
    }
    const transformCircles = (circle) => {
      return <div key={circle._id} onClick={this.handleSelectCircle(circle)}>{circle.title}</div>
    }
    const transformFriends = (friend) => {
      return <div key={friend._id} onClick={this.handleSelectFriend(friend)}>{friend.name}</div>
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
        <button onClick={this.createSession} type="session">Create New Session</button>
        <pre>
          {JSON.stringify(this.state.session, null, 2)}
        </pre>
        <div>
          <form onSubmit={this.handleCircleSubmit}>
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
              <h2>Adding existing friends to a new circle in this session</h2>
                {map(transformMembers, this.state.session.members)}
            </div>
            <div>
              <button>Submit</button>
            </div>
            <article className="cf">
                <div className="circles-list fl w-50 bg-near-white tc">
                  <h2>Existing Circles List</h2>
                    {map(transformCircles, this.state.circles)}
                </div>
                <div className="friends-list fl w-50 bg-light-gray tc">
                  <h2>All Friends List</h2>
                    {map(transformFriends, this.state.friends)}
                </div>
            </article>
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
          </form>

            <div className="link-to-api">
              <Link to="/restaurants">{(params) => <Button {...params}>Let's Eat! Redirect to OpenTable</Button>}
              </Link>
            </div>
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
