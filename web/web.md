Install React

```

$ npm init -y
$ npm install react react-dom react-scripts react-router@next -S
$ json -I -f package.json -e 'this.scripts = { "start": "react-scripts start", "build": "react-scripts build"}'
$ mkdir src public
$ touch src/index.js public/index.html

```
index.html

```
<!doctype html>
<html>
  <head>
    <title>App Name</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```
index.js

```


```const React = require('react')
const ReactDOM = require('react-dom')

const App = () => <h1>Hello React</h1>

ReactDOM.render(<App />, document.getElementById('root'))

```
app.js

```
const React = require('react')
const { BrowserRouter, Match } = require('react-router')

const App = React.createClass({
  render() {
     return (
         <BrowserRouter>
             <div>
                <h1>Hello App</h1>
             </div>
          </BrowserRouter>
      )
  }
})

module.exports = App
```

```
const App = () => <h1>Hello React</h1>

const App = require('./app')

```


pages folder
home.js
about.js

home.js
```
const React = require('react')
const { Link } = require('react-router')

const Home = React.createClass({
  render() {
     return (
         <div>
             <h1>Home</h1>
             <Link to="/about">About</Link>
         </div>
      )
  }
})

module.exports = Home
```
about.js

```
const React = require('react')
const { Link } = require('react-router')

const About = React.createClass({
  render() {
     return (
         <div>
             <h1>About</h1>
             <Link to="/">Home</Link>
         </div>
      )
  }
})

module.exports = About
```

pages folder create model folders with index.js, show.js, form.js
