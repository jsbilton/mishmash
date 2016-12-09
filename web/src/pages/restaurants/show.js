const React = require('react')
const { Link, Redirect} = require('react-router')
const data = require('../../utils/data')()
const confirm = require('react-confirm2')
const Restaurant = React.createClass({
  getInitialState() {
    return {
      restaurant: {
        "id": '',
        "name": ''

      },
      removed: false
    }
  },
  componentDidMount() {
    data.get('restaurants', this.prop.params.id)
    .then(restaurant => this.setState({restaurant}))
  },
  handleRemove(e){
    e.preventDefault()
    confirm('Are you sure you want to remove this Restaurant?', () => {
      data.remove('restaurants', this.props.params.id, this.state.restaurant)
        .then(response => this.setState({removed: true}))
    })
  },
  render () {
    return (
      <div>
        {this.state.removed ? <Redirect to='/restaurants' /> : null}
        <h3>{this.state.restaurant.id}</h3>
        <Link to={`/restaurants/${this.state.restaurant.id}/edit`}></Link>
        <a href="" onClick={this.handleRemove}>Remove</a>
        <Link to='/restaurants'>Back to restaurants</Link>
      </div>
    )
  }
})

module.exports = Restaurant
