const React = require('react')
const labelStyle = { display: 'block' }
const { FormGroup, FormControl, ControlLabel, HelpBlock } = require('react-bootstrap')
const { Redirect, Link } = require('react-router')
const data = require('../../utils/data')()
const FriendForm = React.createClass({
  getInitialState() {
    return {
      friend:'',
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
      }
   },
    render () {
      const formState = this.state.friend._id ? 'Edit' : 'New'
        return (
            <div className="new-friend-form pa4 br2">
              {this.state.resolved ? <Redirect to={`/friends`} /> : null}
                <h1>{formState} Friend Form</h1>
                <div>
                    <form onSubmit={this.handleSubmit}>
                      <div className="friend-form ba-ns pa4">

                        <div className="pa4-l">
                            <form className="bg-light-red mw7 center pa4 br2-ns ba b--black-10">
                              <fieldset className="cf bn ma0 pa0">
                                <legend className="pa0 f5 f4-ns mb3 black-80">Update Friends</legend>
                                <div className="cf">
                                  <label htmlFor="">Name</label>
                                  <input className="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns" placeholder="Your Name" type="text" name="name" defaultValue id="name" onChange={this.handleChange('name')}
                                  value={this.state.friend.name}
                                  type="text"/>

                                  <label htmlFor="">Phone</label>
                                  <input className="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns" placeholder="Your Phone" type="text" name="phone" defaultValue id="phone" onChange={this.handleChange('phone')}
                                  value={this.state.friend.phone}
                                  type="text"/>

                                  <label htmlFor="">Email</label>
                                  <input className="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns" placeholder="Your Email Address" type="text" name="Email_Adress" defaultValue id="Email_Adress" onChange={this.handleChange('email')}
                                  value={this.state.friend.email}
                                  type="text"/>
                                  <input className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns" type="submit" defaultValue="Subscribe" />

                                </div>
                              </fieldset>
                            </form>
                          </div>
                          <FormGroup>
                            <ControlLabel style={labelStyle}>Name</ControlLabel>
                            <FormControl
                              onChange={this.handleChange('name')}
                              value={this.state.friend.name}
                              type="text"/>
                            <HelpBlock>Must Provide: First and Last Name</HelpBlock>
                          </FormGroup>

                          <FormGroup>
                            <ControlLabel style={labelStyle}>Phone</ControlLabel>
                            <FormControl
                              onChange={this.handleChange('phone')}
                              value={this.state.friend.phone}
                              type="text"/>
                          </FormGroup>

                          <FormGroup>
                            <ControlLabel style={labelStyle}>Email</ControlLabel>
                            <FormControl
                              onChange={this.handleChange('email')}
                              value={this.state.friend.email}
                              type="text"/>
                              <HelpBlock>Must Provide: Email</HelpBlock>
                          </FormGroup>
                      </div>
                      <div>
                          <button>Submit</button>
                      </div>

                    </form>
                    <Link to='/friends'>Back to Friends</Link>
                </div>
            </div>
        )
    }
})

module.exports = FriendForm
