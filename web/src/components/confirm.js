const React = require('react')

const Confirm = React.createClass({
  render () {
    console.log(this.props)
    return (
      <div className="popup">
        <div className="upper">{this.props.msg}</div>
        <div className="stroke"></div>
        <div className="lower">
          <button onClick={this.props.onConfirm}><i className="icon-large icon-ok"></i>Ok</button>
          <button onClick={this.props.onCancel}><i className="icon-large icon-remove"></i>Cancel</button>
        </div>
      </div>

      // <div className="confirm-modal">
      //   <h1 className="link tc ph3 pv1 db bg-animate bg-dark-blue hover-bg-blue white f6 br1">{this.props.msg}</h1>
      //   <button onClick={this.props.onConfirm}>Ok</button>
      //   <button onClick={this.props.onCancel}>Cancel</button>
      // </div>
    )
  }
})

module.exports = Confirm
