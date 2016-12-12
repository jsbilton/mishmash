const React = require('react')
const { Link, Redirect } = require('react-router')
const { ButtonToolbar, Button } =require('react-bootstrap')

const data = require('../../utils/data')()
const Confirm = require('../../components/confirm.js')
// const Confirm = require('react-confirm2')
const Restaurant = React.createClass({
  getInitialState() {
    return {
      restaurant:'',
      resolved: false,
    }
  },
  componentDidMount() {
    data.get('restaurants', this.props.params.id)
    .then(restaurant => this.setState({restaurant}))
  },
  handleRemove(e) {
    e.preventDefault()
     this.setState({ showconfirm: true})
   },
  handleConfirm(e) {
    data.remove('restaurants', this.props.params.id, this.state.restaurant)
      .then(res => {
        console.log(res)
        return res
      })
      .then(res => {
        this.setState({
          resolved: true,
          // you want to hide the component
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
        {this.state.resolved ? <Redirect to='/restaurants' /> : null}
        {this.state.showconfirm ?
          <Confirm
            msg="Are you sure?"
            onCancel={this.handleCancel}
            onConfirm={this.handleConfirm} /> : null
        }
        {this.state.showconfirm ? null : <div>
          <header>
            <div style={{float: 'left'}}>
              <img src="http://www.fillmurray.com/g/30/30" />
            </div>
            <h1>{this.state.restaurant.name}</h1>
          </header>

          <nav>
            <Link to={`/restaurants/${this.state.restaurant._id}/edit`}>Edit</Link>
            |
            <a href="#" onClick={this.handleRemove}>Remove</a>
            |
            <Link to="/restaurants">Index</Link>
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

module.exports = Restaurant
