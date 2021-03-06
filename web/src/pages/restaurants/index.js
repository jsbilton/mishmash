const React = require('react')
const data = require('../../utils/data')()
const {Link} = require('react-router')
const {map} = require('ramda')
const FormComponent = require('./form-component')

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
                  <FormComponent
                  />
                    <div className="">
                        <a href={restaurant.reserve_url} className="db link dim tc">
                            <img src={restaurant.image_url} alt="recommended-rest" className="w-100 db outline black-10" />
                            <dl className="mt2 f6 lh-copy">
                                <dt className="clip"></dt>
                                <dd className="ml0 black truncate w-100">{restaurant.name}</dd>
                                <dt className="clip"></dt>
                                <dd className="ml0 gray truncate w-100">Book Reservations</dd>
                            </dl>
                        </a>
                    </div>
                </div>
            </div>
        }
        return (
          <div>
              <div className="restaurants-list pa4">
                    <h1 className="tc fw1 near-black san francisco">Restaurants</h1>
                      <h3 className="tc fw1 pb4 cursive">Select to Make Your Reservations Now!</h3>
                  <hr/>
                  <div className="api-gen-rest">
                      {map(transform, this.state.restaurants)}
                  </div>
                  <hr/>
              <footer className="pv4 ph3 ph5-ns tc">
                <div className="return-endpoints tc">
                  <Link to="/" className="f6 grow no-underline shadow-5 br-pill ba bw2 ph3 pv2 mb2 dib dark-blue" href="#0">Return Home</Link>
                </div>
              </footer>
                  {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
              </div>
          </div>
        )
    }
})
module.exports = Restaurants
