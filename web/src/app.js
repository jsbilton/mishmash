const React = require('react')
const {Button} = require('react-bootstrap')
const {Space, Banner, Heading} = require('rebass')

const {BrowserRouter, Match, Link} = require('react-router')
const {
    Session,
    SessionForm,
    Sessions,
    Restaurant,
    RestaurantForm,
    Restaurants,
    Friend,
    FriendForm,
    Friends,
    Circle,
    Circles,
    CircleForm,
    About,
    Home,
    EateryMap
} = require('./pages')

const App = React.createClass({
    render() {
        return (
            <BrowserRouter>
                <div>
                    <div className="san francisco fw1">
                        <header>
                            <Banner align="center" backgroundImage="https://static.pexels.com/photos/163018/food-business-lunch-restaurant-lunch-163018.jpeg">
                                <Heading level={2} size={0}>
                                    <Link className="san francisco fw1 white-80 link:hover link link:link" to="/sessions/new">MishMash</Link>
                                </Heading>
                            </Banner>
                        </header>
                        <hr/>
                        <div>

                            <div className="tc pa2 link dim black b f1 fw2 ml6 dark-gray tc">
                              <div className="dib">
                                <Link className="link pa2 dim gray f4 f3-ns dib hover-near-black no-underline" to="/about" title="About">About</Link>
                                <Space x={3}/>
                                <Link className="link pa2 dim gray f4 f3-ns dib hover-near-black" to="/friends" title="friends">Friends</Link>
                                <Space x={3}/>
                                <Link className="link pa2 dim gray f4 f3-ns dib hover-near-black" to="/circles" title="circles">Circles</Link>
                                <Space x={3}/>
                              </div>
                            </div>
                          <hr/>
                        </div>
                        {/* </header> */}
                    </div>
                    <Match exactly pattern='/circles' component={Circles}/>
                    <Match pattern='/circles/new' component={CircleForm}/>
                    <Match pattern='/circles/:id/show' component={Circle}/>
                    <Match pattern='/circles/:id/edit' component={CircleForm}/>

                    <Match exactly pattern='/friends' component={Friends}/>
                    <Match pattern='/friends/new' component={FriendForm}/>
                    <Match pattern='/friends/:id/show' component={Friend}/>
                    <Match pattern='/friends/:id/edit' component={FriendForm}/>

                    <Match exactly pattern='/restaurants' component={Restaurants}/>
                    <Match pattern='/restaurants/new' component={RestaurantForm}/>
                    <Match pattern='/restaurants/:id/show' component={Restaurant}/>
                    <Match pattern='/restaurants/:id/edit' component={RestaurantForm}/>

                    <Match exactly pattern='/sessions' component={Sessions}/>
                    <Match pattern='/sessions/new' component={SessionForm}/>
                    <Match pattern='/sessions/:id/show' component={Session}/>
                    <Match pattern='/sessions/:id/edit' component={SessionForm}/>

                    <Match pattern='/about' component={About}/>
                    <Match pattern='/home' component={Home}/>
                </div>
            </BrowserRouter>
        )
    }
})

module.exports = App
