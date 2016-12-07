const React = require('react')
const data = require('../../utils/data')()
const Circle = React.createClass({
  getInitialState() {
    return {
      circle: []
    }
  },
  componentDidMount() {
    data.get(this.props.params.id, (err, circle) => {
      if (err) console.log(err.message)
      this.setState({circle})
    })
  },
  render () {
    return (
      <div>
          <h3>
            {this.state.circle.title}
          </h3>
      </div>
    )
  }
})

module.exports = Circle
