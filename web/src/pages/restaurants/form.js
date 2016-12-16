// const React = require('react')
// // const labelStyle = { display: 'block'}
// const { Redirect, Link } = require('react-router')
// // const { FormGroup, FormControl, ControlLabel} = require('react-bootstrap')
// const data = require('../../utils/data')()
// const RestaurantForm = React.createClass({
//     getInitialState() {
//         return {
//             restaurant: {
//                 name: '',
//                 address: '',
//                 city: '',
//                 state: '',
//                 postal_code: '',
//                 phone: '',
//                 price_rating: '',
//                 preferences: {
//
//                 }
//             },
//             resolved: false
//         }
//     },
//     componentDidMount() {
//       if(this.props.params.id) {
//         data.get('restaurants', this.props.params.id, this.state.restaurant.id)
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
//     handleSubmit (e) {
//         e.preventDefault()
//         if (!this.state.restaurant._id) {
//             data.post('restaurants', this.state.restaurant)
//             .then(res => this.setState({ resolved: true }))
//         } else {
//             data.put('restaurants', this.state.restaurant._id, this.state.restaurant)
//             .then(res => this.setState({ resolved: true}))
//         }
//     },
//   //   handleSubmit(e) {
//   //   e.preventDefault()
//   //   fetch('https://www.omdbapi.com/?r=json&s=' + this.state.search)
//   //     .then(res => res.json())
//   //     .then(results => results.Search
//   //       ? this.setState({ results })
//   //       : this.setState({error: results}))
//   //     .catch(error => this.setState({ error }))
//   // },
//     render() {
//       const formState = this.state.restaurant.id ? 'Edit' : 'Name'
//         return (
//             <div>
//               {this.state.resolved ? <Redirect to={`/restaurants`} /> : null}
//                 <h1>{formState} Restaurant Form</h1>
//                 <div>
//                     <form onSubmit={this.handleSubmit}>
//                       <div>
//                         <button>Submit</button>
//                       </div>
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
