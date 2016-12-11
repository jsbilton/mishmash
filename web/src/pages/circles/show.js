const React = require('react')
const data = require('../../utils/data')()
const { Link , Redirect } = require('react-router')
const Confirm = require('../../components/confirm.js')
const Circle = React.createClass({
  getInitialState() {
    return {
      circle: '',
      resolved: false
    }
  },
  componentDidMount() {
    data.get('circles', this.props.params.id)
    .then(circle => this.setState({circle}))
  },
  handleRemove(e) {
    e.preventDefault()
    this.setState({showconfirm: true})
   },
  handleConfirm(e) {
    data.remove('circles', this.props.params.id, this.state.circle)
      .then(res => {
        console.log(res)
        return res
      })
      .then(res => {
        this.setState({
          resolved: true,
          showconfirm: false
        })
      })
  },
  handleCancel(e) {
    this.setState({showconfirm: false})
  },
  render () {
    return (
      <div>
        {this.state.resolved ? <Redirect to='/circles' /> : null}

        {this.state.showconfirm ?
          <Confirm
            msg="Are you sure?"
            onCancel={this.handleCancel}
            onConfirm={this.handleConfirm} /> : null
        }

        {this.state.showconfirm ? null : <div>
        <h1>Show</h1>
          <h3>{this.state.circle.title}</h3>
          <nav>
            <Link to={`/circles/${this.state.circle._id}/edit`}>Edit</Link>
            <a href="#" onClick={this.handleRemove}>Remove Circle</a>
            <Link to={`/circles`}>Return</Link>
            </nav>
          </div>
          }

          <pre>
            {JSON.stringify(this.state, null, 2)}
          </pre>
      </div>
    )
  }
})

module.exports = Circle
