const React = require('react')
const data = require('../../utils/data')()
const {Link} = require('react-router')
const {Card, CardImage, Heading} = require('rebass')

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

                <div className="fl w-50 w-25-m w-20-l pa4 v-top">
                    <h3 className="f3 tc athelas fw1 pa1 mv0">{restaurant.name}</h3>
                    <div className="">
                        <a href={restaurant.reserve_url} className="db link dim tc">
                            <img src={restaurant.image_url} alt="recommended-rest" className="w-100 db outline black-10" style={{
                                height: '200px',
                                width: '200px'
                            }}/>
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
        return (
            <div className="restaurants-list pa4">
                <h1 className="tc fw1 san francisco">Restaurants</h1>
                  <h3 className="tc fw1 cursive">Select to Make Your Reservations Now!</h3>
                <div>
                    {map(transform, this.state.restaurants)}
                </div>
                <footer>
                  <div className="return-endpoints">
                    <Link to="/" className="f6 grow no-underline br-pill ba bw2 ph3 pv2 mb2 dib dark-blue" href="#0">Return Home</Link>
                      {/* <Link to='/restaurants'>Return to Restaurant List</Link>
                      |
                      <Link to='/'>Return to App Resource</Link> */}
                  </div>
                </footer>
                {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
            </div>
        )
    }
})
module.exports = Restaurants
