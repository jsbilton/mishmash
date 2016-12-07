const React = require('react')
const { BrowserRouter, Match } = require('react-router')
const { Circle, Circles, CircleForm, About, Home } = require('./pages')
const App = React.createClass({
  render() {
     return (
         <BrowserRouter>
             <div>
                <h1>MishMash</h1>
                <Match exactly pattern='/circles' component={Circles} />
                <Match pattern='/circles/new' component={CircleForm} />
                <Match pattern='/circles/:id' component={Circle} />

                <Match pattern='/about' component={About} />
                <Match pattern='/home' component={Home} />
             </div>
          </BrowserRouter>
      )
  }
})

module.exports = App
