const React = require('react')
const {Button, Jumbotron} = require('react-bootstrap')
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
                    <header>
                        <Jumbotron>
                            <h1>MishMash</h1>
                        </Jumbotron>
                        <div>
                            <Link to="/sessions/new">{(params) => <Button {...params}>Hungry Now!</Button>}
                            </Link>
                        </div>
                        <nav className="pa4">
                            <Link to="/restaurants">{(params) => <Button {...params}>My Restaurants</Button>}
                            </Link>
                            <Link to="/friends">{(params) => <Button {...params}>My Friends</Button>}</Link>
                            <Link to="/circles">{(params) => <Button {...params}>My Circles</Button>}</Link>
                        </nav>
                    </header>
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
