const React = require('react')
const data = require('../../utils/data')()
const { Link, Redirect } = require('react-router')
const CircleForm = React.createClass({
  getInitialState() {
    return {
      circle: {
        name: ''
      },
      resolved: false
    }
  },
  handleChange(field) {
    return (e) => {
      let circle = {...this.state}
      circle[field] = e.target.value
      this.setState({circle})
    }
  },
  handleSubmit(e) {
    e.preventDefault()
    data.post('circles', this.state.circle)
      .then(res => this.setState({resolved: true}))
  },
  render() {
    return (
      <div>
        {this.state.resolved ? <Redirect to='/circles' /> : null }
        <h1>New Circle Form </h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="">Name</label>
            <input
              value={this.state.circle.name}
              onChange={this.handleChange('name')}
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
