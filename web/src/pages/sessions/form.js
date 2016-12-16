const React = require('react')
const { Redirect, Link } = require('react-router')
const data = require('../../utils/data')()
const { pluck, map } = require('ramda')
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
    thisSession.circles.unshift(thisSession.newCircle)
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
    console.log(this.state);
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
      this.setState({resolved: true})
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
    // const formState = this.state.session._id ? 'Edit' : 'New'
    const transformMembers = (friend) => {
      return <div className="link b black pv2 db bg-animate hover-bg-light-gray" key={friend._id}>{friend.name}</div>
    }
    const transformCircles = (circle) => {
      return <div className="link b black pv2 db bg-animate hover-bg-light-gray" key={circle._id} onClick={this.handleSelectCircle(circle)}>{circle.title}</div>
    }
    const transformFriends = (friend) => {
      return <div className="link b black pv2 db bg-animate hover-bg-light-gray" key={friend._id} onClick={this.handleSelectFriend(friend)}>{friend.name}</div>
    }

   return (
      <div>
        {this.state.resolved ? <Redirect to={`/restaurants`} /> : null}
        <div>

            <div className="tc">
              <div>
                <h2 className="fw1 tc san francisco">Click Circle then Click Members to Add <br/>Or Click Member for New Circle
                </h2>
                <div className="members-list f4 br4 bold center fl w-100 w-50-ns bg-light-gray tc">
                  {map(transformMembers, this.state.session.members)}
                </div>
              </div>
              <hr/>
              <article className="cf pa3">
                  <div className="circles-list f4 br4 bold center fl w-100 w-50-ns bg-near-white tc ">
                    <h2 className="pa2 fwl avenir">My Circles</h2>
                      {map(transformCircles, this.state.circles)}
                  </div>
                  <div className="friends-list f4 br4 bold center fl w-100 w-50-ns bg-light-gray tc">
                    <h2 className="pa2 fw1 avenir">Select Friends to Circle</h2>
                      {map(transformFriends, this.state.friends)}
                  </div>
              </article>
            </div>

            <div className="link-to-api tc pa4">
              <button
                onClick={this.handleCircleSubmit}
                to="/restaurants"
                className="f6 grow no-underline br-pill ba bw2 ph3 pv2 mb2 dib dark-blue" href="#0">Let's Eat!</button>
            </div>
        </div>
      </div>
    )
  }
})
module.exports = SessionForm
