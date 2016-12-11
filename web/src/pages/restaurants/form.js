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
                price_rating: '',
                preferences: {

                }
            },
            resolved: false
        }
    },
    componentDidMount() {
      if(this.props.params.id) {
        data.get('restaurants', this.props.params.id)
        .then(restaurant => this.setState({restaurant}))
      }
    },
    handleChange(field) {
      return (e) => {
        let restaurant = {...this.state.restaurant}
        restaurant[field] = e.target.value
        this.setState({restaurant})
      }
    },
    handleSubmit (e) {
     e.preventDefault()
     if (!this.state.restaurant._id) {
         data.post('restaurants', this.state.restaurant)
         .then(res => this.setState({ resolved: true }))
     } else {
         data.put('restaurants', this.state.restaurant._id, this.state.restaurant)
         .then(res => this.setState({ resolved: true}))
     }
   },
   handleSelect(e){
     const restaurant = {...this.state.restaurant}
     restaurant.price_rating = {}
     this.setState({restaurant})
   },
    render() {
      const formState = this.state.restaurant._id ? 'Edit' : 'Name'
        return (
            <div>
              {this.state.resolved ? <Redirect to={`/restaurants`} /> : null}
                <h1>{formState} Restaurant Form</h1>
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
                        <select name="price-rater" id=""
                          value={this.state.restaurant.price_rating}
                          onChange={this.handleChange('price_rating')}>
                          <option value='-1'>Select</option>
                          <option value='1'>$$$$</option>
                          <option value='2'>$$$</option>
                          <option value='3'>$$</option>
                          <option value='4'>$</option>
                        </select>
                        <label style={labelStyle}>Preferences</label>
                        <input onChange={this.handleChange} value={this.state.restaurant.preferences} type="text"/>
                        <div>
                            <button>Submit</button>
                        </div>
                    </form>
                    <Link to='/restaurants'>Return to Restaurants List</Link>
                </div>
                <pre>
                  {JSON.stringify(this.state, null, 2)}
                </pre>
            </div>
        )
    }
})

module.exports = RestaurantForm
