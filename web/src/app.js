const React = require('react')
const {BrowserRouter, Match} = require('react-router')
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
    Home
} = require('./pages')
const App = React.createClass({
    render() {
        return (
            <BrowserRouter>
                <div>
                    <h1>MishMash</h1>
                    <Match exactly pattern='/circles' component={Circles}/>
                    <Match pattern='/circles/new' component={CircleForm}/>
                    <Match pattern='/circles/:id/show' component={Circle}/>

                    <Match exactly pattern='/friends' component={Friends}/>
                    <Match pattern='/friends/new' component={FriendForm}/>
                    <Match pattern='/friends/:id/show' component={Friend}/>

                    <Match exactly pattern='/restaurants' component={Restaurants}/>
                    <Match pattern='/restaurants/new' component={RestaurantForm}/>
                    <Match pattern='/restaurants/:id/show' component={Restaurant}/>

                    <Match exactly pattern='/sessions' component={Sessions}/>
                    <Match pattern='/sessions/new' component={SessionForm}/>
                    <Match pattern='/sessions/:id/show' component={Session}/>

                    <Match pattern='/about' component={About}/>
                    <Match pattern='/home' component={Home}/>
                </div>
            </BrowserRouter>
        )
    }
})

module.exports = App
