const React = require('react')
const labelStyle = { display: 'block' }
const { Redirect, Link } = require('react-router')
const data = require('../../utils/data')()
const FriendForm = React.createClass({
  getInitialState() {
    return {
      friend: '',
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
            <div>
              {this.state.resolved ? <Redirect to={`/friends`} /> : null}
                <h1>{formState} Friend Form</h1>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label style={labelStyle}>Name</label>
                        <input
                          onChange={this.handleChange('name')}
                          value={this.state.friend.name}
                          type="text"/>
                        <label style={labelStyle}>Phone</label>
                        <input
                          onChange={this.handleChange('phone')}
                          value={this.state.friend.phone}
                          type="text"/>
                        <label style={labelStyle}>Email</label>
                        <input
                          onChange={this.handleChange('email')}
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
