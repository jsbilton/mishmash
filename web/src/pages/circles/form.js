const React = require('react')
const labelStyle = { display: 'block' }
const data = require('../../utils/data')()
const { Link, Redirect } = require('react-router')
const CircleForm = React.createClass({
  getInitialState() {
    return {
      circle: {
        title: '',
        friends: []
      },
      resolved: false
    }
  },
  componentDidMount() {
    // if (this.props.params.id) {
    //   data.get('circles', this.props.params.id)
    //   .then(circle => this.setState({circle}))
    // }
  },
  handleChange(field) {
    return (e) => {
      let circle = {...this.state.circle}
      circle[field] = e.target.value
      this.setState({circle})
    }
  },
  handleSubmit(e) {
    e.preventDefault()
    // if (this.state.circle.id) {
    //   return data.put('circles', this.state.circle.id, this.state.circle)
    //     .then(response => {
    //       if (response.id) {
    //         this.setState({resolved: response.id})
    //       }
    //     })
    // }
    console.log(this.state.circle)
    data.post('circles', this.state.circle)
      .then(response => {
        if (response.id) {
          this.setState({resolved: response.id})
      }
   })
 },
  render() {
    const formState = this.state.circle.id ? 'Edit' : 'New'
    return (
      <div>
        {this.state.resolved ? <Redirect to='/circles' /> : null }
        <h1>{formState} Circle Form</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label style={labelStyle}>Name</label>
            <input
              value={this.state.circle.title}
              onChange={this.handleChange('title')}
              type="text"/>
            <label style={labelStyle}>Friends</label>
            <input
              value={this.state.circle.friends}
              onChange={this.handleChange('friends')}
              type="text"/>
            <div>
              <button>Submit</button>
            </div>
          </form>
          <Link to='/circles'>Return</Link>
        </div>
      </div>
    )
  }
})

module.exports = CircleForm
