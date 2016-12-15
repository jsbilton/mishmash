const React = require('react')
const { Redirect, Link } = require('react-router')
const data = require('../../utils/data')()
const FriendForm = React.createClass({
  getInitialState() {
    return {
      friend: {
        name: '',
        phone: '',
        email: ''
      },
      resolved: false
    }
  },
  componentDidMount() {
    if (this.props.params.id)
       data.get('friends', this.props.params.id)
      .then(friend => this.setState({friend}))
  },
  handleChange(field){
    return (e) => {
      // console.log("something", e.target.value)
      let friend = {...this.state.friend}
      friend[field] = e.target.value
      this.setState({friend})
    }
  },
  handleSubmit(e){
    e.preventDefault()
      if (!this.state.friend._id) {
        data.post('friends', this.state.friend)
        .then(res => this.setState({resolved: true}))
      } else {
          data.put('friends', this.state.friend._id,
          this.state.friend)
          .then(res => this.setState({resolved: true}))
          .catch(err => console.log(err))
      }
   },
    render () {
      const formState = this.state.friend._id ? 'Edit' : 'New'
        return (
          <div className="new-friend-form">
              {this.state.resolved ? <Redirect to={`/friends`} /> : null}
                <h1 className="fw1 san francisco tc">{formState} Friend</h1>

                <div className="friend-form pa4">
                        <div className="pa4-l">
                          <div className="bg-light-green mw7 center pa4 br2-ns ba b--black-10">
                              <fieldset className="cf bn ma0 pa0">
                                <legend className="pt1 pb2 f5 f4-ns mb3 black-80">Friends</legend>
                                <form onSubmit={this.handleSubmit}>
                                  <div className="cf">
                                    <label htmlFor="">Name</label>
                                    <input className="f6 f5-l input-reset bn db black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns"  name="name" onChange={this.handleChange('name')}
                                    value={this.state.friend.name}
                                    type="text"/>
                                  </div>
                                  <div className="cf">
                                    <label htmlFor="">Phone</label>
                                    <input className="f6 f5-l input-reset bn db black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns" name="phone" onChange={this.handleChange('phone')}
                                    value={this.state.friend.phone}
                                    type="phone_number"/>
                                  </div>
                                  <div className="cf">
                                    <label htmlFor="">Email</label>
                                    <input className="f6 f5-l input-reset bn db black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns" name="Email_Address" onChange={this.handleChange('email')}
                                    value={this.state.friend.email}
                                    type="email"/>
                                  </div>
                                  <div>
                                    <input className="inherit f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns" type="submit" defaultValue="Submit" />
                                  </div>
                                </form>

                              </fieldset>
                          </div>
                        </div>
                        <hr/>
                        <div className="tc pb2 ma4">
                          <Link to={`/friends`}
                            className="f6 dib ph2 link mid-gray dim">
                            Back to My Friends</Link>
                        </div>
                </div>
                {/* <pre>
                  {JSON.stringify(this.state,null,2)}
                </pre> */}
            </div>
        )
    }
})

module.exports = FriendForm
