// const React = require('react')
// const labelStyle = { display: 'block'}
// const fetch = require('isomorphic-fetch')
// // const { Redirect, Link } = require('react-router')
// // const { FormGroup, FormControl, ControlLabel, Button} = require('react-bootstrap')
// // const data = require('../../utils/data')()
//
// const RestaurantForm = React.createClass({
//   getInitialState() {
//     return {
//       search: '',
//       results: {
//
//     },
//     error: null
//   }
// },
// handleChange(e) {
//   this.setState({search: e.target.value})
// },
// handleSubmit(e) {
//   e.preventDefault()
//   fetch('http://opentable.herokuapp.com/api/restaurants?zip=' + this.state.search)
//     .then(res => res.json())
//     .then(results => results
//       ? this.setState({ results })
//       : this.setState({error: results}))
//     .catch(error => this.setState({ error }))
// },
//   render () {
//     return (
//       <div>
//         <h1>Recommendations</h1>
//                   <form onSubmit={this.handleSubmit}>
//                     <input
//                       value={this.state.search}
//                       onChange={this.handleChange}
//                       type="text"/>
//                     <button>Search</button>
//                   </form>
//
//                   {/* {this.state.error
//                     ? <div className='error'>{this.state.error.message}</div>
//                     : null }
//                   {this.state.results.Search.length > 0
//                     ? <div>Search results: {this.state.results.Search.length}</div>
//                     : null }
//                   Search results: {}
//                   <hr />
//
//                   {this.state.results.Search.map(item =>
//                     <img />
//                   )} */}
//       </div>
//     )
//   }
//
// })
// module.exports = RestaurantForm
