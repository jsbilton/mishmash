const React = require('react')
const labelStyle = { display: 'block' }
const { Redirect, Link } = require('react-router')
const data = require('../../utils/data')()
const FriendForm = React.createClass({
  getInitialState() {
    return{
      friend: {
        name: ''
      },
      resolved: false
    }
  },
  handleChange(field){
    return (e) => {
      let friend = {...this.state.friend}
      friend[field] = e.target.value
      this.setState({friend})
    }
  },
  handleSubmit(e){
    e.preventDefault()
    data.post('friends', this.state.friend)
      .then(response => this.setState({resolved: true}))
  },
    render () {
        return (
            <div>
              {this.state.resolved ? <Redirect to='friends' /> : null}
                <h1>New Friend Form</h1>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label style={labelStyle}>First Name</label>
                        <input
                          onClick={this.handleChange}
                          value={this.state.friend.firstname}
                          type="text"/>
                        <label style={labelStyle}>Last Name</label>
                        <input
                          onClick={this.handleChange}
                          value={this.state.friend.lastname}
                          type="text"/>
                        <label style={labelStyle}>Phone</label>
                        <input
                          onClick={this.handleChange}
                          value={this.state.friend.phone}
                          type="text"/>
                        <label style={labelStyle}>Email</label>
                        <input
                          onClick={this.handleChange}
                          value={this.state.friend.email}
                          type="text"/>
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
