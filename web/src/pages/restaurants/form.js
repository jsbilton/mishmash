const React = require('react')
// const labelStyle = { display: 'block'}
const { Redirect, Link } = require('react-router')
// const { FormGroup, FormControl, ControlLabel} = require('react-bootstrap')
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
        data.get('restaurants', this.props.params.id, this.state.restaurant.id)
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
  //   handleSubmit(e) {
  //   e.preventDefault()
  //   fetch('https://www.omdbapi.com/?r=json&s=' + this.state.search)
  //     .then(res => res.json())
  //     .then(results => results.Search
  //       ? this.setState({ results })
  //       : this.setState({error: results}))
  //     .catch(error => this.setState({ error }))
  // },
    render() {
      const formState = this.state.restaurant.id ? 'Edit' : 'Name'
        return (
            <div>
              {this.state.resolved ? <Redirect to={`/restaurants`} /> : null}
                <h1>{formState} Restaurant Form</h1>
                <div>
                    <form onSubmit={this.handleSubmit}>
                      {/* <FormGroup>
                        <ControlLabel style={labelStyle}>Name</ControlLabel>
                        <FormControl onChange={this.handleChange('name')} value={this.state.restaurant.name} type="text"/>
                      </FormGroup>

                      <FormGroup>
                        <ControlLabel style={labelStyle}>Address</ControlLabel>
                        <FormControl onChange={this.handleChange('address')} value={this.state.restaurant.address} type="text"/>
                      </FormGroup>

                      <FormGroup>
                        <ControlLabel style={labelStyle}>City</ControlLabel>
                        <FormControl onChange={this.handleChange('city')} value={this.state.restaurant.city} type="text"/>
                      </FormGroup>

                      <FormGroup>
                        <ControlLabel style={labelStyle}>State</ControlLabel>
                        <FormControl onChange={this.handleChange('state')} value={this.state.restaurant.state} type="text"/>
                      </FormGroup>

                      <FormGroup>
                        <ControlLabel style={labelStyle}>Postal Code</ControlLabel>
                        <FormControl onChange={this.handleChange('postal_code')} value={this.state.restaurant.postal_code} type="text"/>
                      </FormGroup>

                      <FormGroup>
                        <ControlLabel style={labelStyle}>Phone</ControlLabel>
                        <FormControl onChange={this.handleChange('phone')} value={this.state.restaurant.phone} type="text"/>
                      </FormGroup>

                      <FormGroup>
                        <ControlLabel style={labelStyle}>Price Rating</ControlLabel>
                        <FormControl onChange={this.handleChange('price_rating')} value={this.state.restaurant.price_rating} type="text"/>
                      </FormGroup>

                      <FormGroup>
                        <ControlLabel style={labelStyle}>Preferences</ControlLabel>
                        <FormControl onChange={this.handleChange} value={this.state.restaurant.preferences} type="text"/>
                      </FormGroup> */}
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



// const React = require('react')
// const labelStyle = { display: 'block'}
// const { Redirect, Link } = require('react-router')
// const { FormGroup, FormControl, ControlLabel, HelpBlock, ButtonToolbar, Button } = require('react-bootstrap')
// const data = require('../../utils/data')()
// const RestaurantForm = React.createClass({
//     getInitialState() {
//         return {
//           restaurant: {
//               name: '',
//               address: '',
//               city: '',
//               state: '',
//               postal_code: '',
//               phone: '',
//               price_rating: '',
//               preferences: {
//
//               }
//           },
//           resolved: false
//
//       }
//     },
//     componentDidMount() {
//       if(this.props.params.id) {
//         data.get('restaurants', this.props.params.id)
//         .then(restaurant => this.setState({restaurant}))
//       }
//     },
//     handleChange(field) {
//       return (e) => {
//         let restaurant = {...this.state.restaurant}
//         restaurant[field] = e.target.value
//         this.setState({restaurant})
//       }
//     },
//   handleSubmit(e) {
//     e.preventDefault()
//       if (!this.state.restaurant._id) {
//           data.post('restaurants', this.state.restaurant)
//           .then(res => this.setState({ resolved: true }))
//       } else {
//           data.put('restaurants', this.state.restaurant._id, this.state.restaurant)
//           .then(res => this.setState({ resolved: true}))
//       }
//   },
//   //  handleSelect(e){
//   //    const restaurant = {...this.state.restaurant}
//   //    restaurant.price_rating = e.target.value
//   //    this.setState({restaurant})
//   //  },
//     render() {
//       const formState = this.state.restaurant._id ? 'Edit' : 'New'
//         return (
//             <div>
//               {this.state.resolved ? <Redirect to={`/restaurants`} /> : null}
//                 <h1>{formState} Restaurant Form</h1>
//                 <div>
//                   <form onSubmit={this.handleSubmit}>
//                         <FormGroup>
//                           <ControlLabel style={labelStyle}>Name</ControlLabel>
//                           <FormControl onChange={this.handleChange('name')} value={this.state.restaurant.name} type="text"/>
//                           <HelpBlock>Must Provide: First and Last Name</HelpBlock>
//                         </FormGroup>
//                         <FormGroup>
//                           <ControlLabel style={labelStyle}>Address</ControlLabel>
//                           <FormControl onChange={this.handleChange('address')} value={this.state.restaurant.address} type="text"/>
//                         </FormGroup>
//                         <FormGroup>
//                           <ControlLabel style={labelStyle}>City</ControlLabel>
//                           <FormControl onChange={this.handleChange('city')} value={this.state.restaurant.city} type="text"/>
//                         </FormGroup>
//                         <FormGroup>
//                           <ControlLabel style={labelStyle}>State</ControlLabel>
//                           <FormControl onChange={this.handleChange('state')} value={this.state.restaurant.state} type="text"/>
//                         </FormGroup>
//                         <FormGroup>
//                           <ControlLabel style={labelStyle}>Postal Code</ControlLabel>
//                           <FormControl onChange={this.handleChange('postal_code')} value={this.state.restaurant.postal_code} type="text"/>
//                           <HelpBlock>Must Provide: User Zip Code</HelpBlock>
//                         </FormGroup>
//                         <FormGroup>
//                           <ControlLabel style={labelStyle}>Phone</ControlLabel>
//                           <FormControl onChange={this.handleChange('phone')} value={this.state.restaurant.phone} type="text"/>
//                         </FormGroup>
//                         {/* <FormGroup>
//                           <ControlLabel style={labelStyle}>Price Rating</ControlLabel>
//                             <FormControl value={this.state.restaurant.price_rating} onChange={this.handleSelect('price_rating')}>
//                               <option value="-1">Price</option>
//                             </FormControl>
//                         </FormGroup> */}
//                         <FormGroup>
//                           <ControlLabel style={labelStyle}>Preferences</ControlLabel>
//                           <FormControl onChange={this.handleSelect} value={this.state.restaurant.preferences} type="text"/>
//                         </FormGroup>
//                         <div>
//                           <ButtonToolbar>
//                             <Button>Submit</Button>
//                           </ButtonToolbar>
//                         </div>
//                     </form>
//                     <Link to='/restaurants'>Return to Restaurants List</Link>
//                 </div>
//                 <pre>
//                   {JSON.stringify(this.state, null, 2)}
//                 </pre>
//             </div>
//         )
//     }
// })
//
// module.exports = RestaurantForm
