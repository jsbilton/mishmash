const React = require('react')
const data = require('../../utils/data')()
const { Link , Redirect } = require('react-router')
const confirm = require('react-confirm2')
const Circle = React.createClass({
  getInitialState() {
    return {
      circle: {
        id: -1,
        name: ''
      },
      removed: false
    }
  },
  componentDidMount() {
    data.get('circles', this.props.params.id)
      .then(circle => this.setState({circle}))
  },
  handleRemove(e) {
    e.preventDefault()
    confirm('Are you sure you want to remove this Circle?', () => {
      data.remove('circles', this.props.params.id, this.state.favorite)
        .then(response => this.setState({removed: true}))
    })
  },
  render () {
    return (
      <div>
        {this.state.removed ? <Redirect to='/circles' /> : null}
          <h3>{this.state.circle.title}</h3>
          <Link to={`/circles/${this.state.circle.id}/edit`}>Edit</Link>
          <a href="" onClick={this.handleRemove}>Remove Circle</a>
          <Link to='/circles'>Return</Link>
      </div>
    )
  }
})

module.exports = Circle
