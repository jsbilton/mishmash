const React = require('react')

const Confirm = React.createClass({
  render () {
    console.log(this.props)
    return (

      <div>
        <h1>{this.props.msg}</h1>
        <button onClick={this.props.onConfirm}>Ok</button>
        <button onClick={this.props.onCancel}>Cancel</button>
      </div>
    )
  }
})

module.exports = Confirm
