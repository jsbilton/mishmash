const React = require('react')
const data = require('../../utils/data')()
const {Link} = require('react-router')
// const { Button } = require('react-bootstrap')
const {map} = require('ramda')

const Restaurants = React.createClass({
    getInitialState() {
        return {restaurants: [], zip: '29464'}
    },
    componentDidMount() {
        data.listRecommendations(this.state.zip).then(response => this.setState({restaurants: response.restaurants}))
    },
    render() {
        const transform = (restaurant) => {
          return <div className="restaurant-item v-top" key={restaurant.id}>
                        <Link to={`/restaurants/${restaurant.name}/show`}></Link>
                            {/* <h3 className="f3 fw1 pa3 mv0">{restaurant.name}</h3> */}
                            <div className="fl w-50 w-25-m w-20-l pa4 v-top">
                              <h3 className="f3 fw1 pa3 mv0">{restaurant.name}</h3>
                              <div className="">
                                <a href={restaurant.reserve_url} className="db link dim tc">
                                  <img src={restaurant.image_url} alt="recommended-rest" className="w-100 db outline black-10" />
                                  <dl className="mt2 f6 lh-copy">
                                    <dt className="clip"></dt>
                                    <dd className="ml0 black truncate w-100">{restaurant.city}, {restaurant.state}</dd>
                                    <dt className="clip"></dt>
                                    <dd className="ml0 gray truncate w-100">Book Reservations</dd>
                                  </dl>
                                </a>
                              </div>
                            </div>
                          </div>
        }
          // return <div class="restaurant-item" key={restaurant.id}>
          //   <Link to={`/restaurants/${restaurant.name}/show`}></Link>
          //   <h3 className="f3 fw4 pa3 mv0">{restaurant.name}</h3>
          //   <div className="cf pa2">
          //     <div className="fl w-50 w-25-m w-20-l pa2">
          //       <a href={restaurant.reserve_url} className="db link dim tc">
          //         <img src={restaurant.image_url} className="w-100 db outline black-10" alt="restaurant-pic"/>
          //       </a>
          //     </div>
          //   </div>
          // </div>




      return (
        <div className="restaurants-list pa4">
          <h1>Restaurants</h1>
            <div>
                {map(transform, this.state.restaurants)}
            </div>
          <div>
            <Link to='/restaurants'>Return to Restaurant List</Link>
             |
            <Link to='/'>Return to App Resource</Link>
          </div>
            <pre>{JSON.stringify(this.state, null, 2)}</pre>
        </div>
      )
    }
})
module.exports = Restaurants
    // const Restaurants = React.createClass({
    //   getInitialState() {
    //     return {
    //       restaurants: []
    //     }
    //   },
    //   componentDidMount() {
    //     // change resource to different API
    //     //data.list('listRecommendations', this.props.params.id)
    //     data.listRecommendations('restaurants')
    //     .then(restaurants => {
    //       this.setState({
    //         restaurants: restaurants.rows
    //       })
    //     })
    //     .catch(err => console.log("error", err.message))
    //   },
    //   render () {
    //     const transform = map(rest => {
    //       return <div key={rest.doc.name}>
    //         <Link to={`/restaurants/${rest.id}/show`}>{rest.doc.name}</Link>
    //       </div>
    //     })
    //     return (
    //       <div>
    //         <h1>Restaurants List</h1>
    //         <Link to="/restaurants/new">{(params) => <Button {...params}>Add A Restaurant</Button>}</Link>
    // <ul>
    //   {transform(this.state.restaurants)}
    // </ul>
    // <Link to='/restaurants'>Return to Restaurant List</Link>
    // |
    // <Link to='/'>Return to App Resource</Link>
    // <pre>
    //   {JSON.stringify(this.state, null, 2)}
    // </pre>
    //       </div>
    //     )
    //   }
    // })
    //
    // module.exports = Restaurants
