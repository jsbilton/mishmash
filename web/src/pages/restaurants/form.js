const React = require('react')
const labelStyle = { display: 'block'}
const { Redirect, Link } = require('react-router')
const data = require('../../utils/data')()
const RestaurantForm = React.createClass({
    getInitialState() {
        return {
            restaurant: {
                name: '',
                address: '',
                city: '',
                state: '',
                postal_code: '',
                phone: '',
                price_rating: ''
            },
            resolved: false
        }
    },
    handleChange(field) {
      return (e) => {
        let restaurant = {...this.state.restaurant}
        restaurant[field] = e.target.value
        this.setState({restaurant})
      }
    },
    handleSubmit(e) {
      e.preventDefault()
      data.post('restaurants', this.state.restaurant)
        .then(res => {
          if (res.id) {
            this.setState({resolved: res.id})
          }
        })
    },
    render() {
        return (
            <div>
              {this.state.resolved ? <Redirect to='/restaurants' /> : null}
                <h1>Restaurant Form</h1>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label style={labelStyle}>Name</label>
                        <input onChange={this.handleChange('name')} value={this.state.restaurant.name} type="text"/>

                        <label style={labelStyle}>Address</label>
                        <input onChange={this.handleChange('address')} value={this.state.restaurant.address} type="text"/>

                        <label style={labelStyle}>City</label>
                        <input onChange={this.handleChange('city')} value={this.state.restaurant.city} type="text"/>
                        <label style={labelStyle}>State</label>
                        <input onChange={this.handleChange('state')} value={this.state.restaurant.state} type="text"/>
                        <label style={labelStyle}>Postal Code</label>
                        <input onChange={this.handleChange('postal_code')} value={this.state.restaurant.postal_code} type="text"/>
                        <label style={labelStyle}>Phone</label>
                        <input onChange={this.handleChange('phone')} value={this.state.restaurant.phone} type="text"/>
                        <label style={labelStyle}>Price Rating</label>
                        <input onChange={this.handleChange('price_rating')} value={this.state.restaurant.price_rating} type="text"/>
                        <div>
                            <button>Submit</button>
                        </div>
                    </form>
                    <Link to='/restaurants'>Return to Restaurants List</Link>
                </div>
            </div>
        )
    }
})

module.exports = RestaurantForm
