const React = require('react')
const ReactDOM = require('react-dom')
import "tachyons-hovers"
require('./stylesheet.css')
const App = require('./app')

ReactDOM.render(<App />, document.getElementById('root'))
