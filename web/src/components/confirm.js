const React = require('react')
const Confirm = React.createClass({
  render () {
    // console.log(this.props)
    return (
      <div className="popup shadow-2">
        <div className="upper">{this.props.msg}</div>
        <div className="stroke"></div>
        <div className="lower">
          <button onClick={this.props.onConfirm}><i className="icon-large icon-ok"></i>Ok</button>
          <button onClick={this.props.onCancel}><i className="icon-large icon-remove"></i>Cancel</button>
        </div>
      </div>
    )
  }
})

module.exports = Confirm
