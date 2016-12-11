const React = require('react')
const { Link, Redirect} = require('react-router')
const data = require('../../utils/data')()
const Confirm = require('../../components/confirm.js')
const Friend = React.createClass({
  getInitialState(){
    return {
      friend: '',
      resolved: false
    }
  },
  componentDidMount() {
    data.get('friends', this.props.params.id)
    .then(friend => this.setState({friend}))
  },
  handleRemove(e){
    e.preventDefault()
    this.setState({ showconfirm: true })
  },
  handleConfirm(e) {
    data.remove('friends', this.props.params.id, this.state.friend)
      .then(res => {
        console.log(res)
        return res
      })
      .then(res => {
        this.setState({
          resolved: true,
          showconfirm: false
        })
      })
  },
  handleCancel(e) {
    this.setState({showconfirm: false})
  },
    render() {
        return (
            <div>
              {this.state.resolved ? <Redirect to='/friends' /> : null}
              {this.state.showconfirm ?
                <Confirm
                  msg="Are you sure?"
                  onCancel={this.handleCancel}
                  onConfirm={this.handleConfirm} /> : null
              }
              {this.state.showconfirm ? null : <div>
              <h1>Show</h1>
              <h3>{this.state.friend.name}</h3>
                <nav>
                  <Link to={`/friends/${this.state.friend._id}/edit`}>Edit</Link>
                  <a href="#" onClick={this.handleRemove}>Remove Circle</a>
                  <Link to={`/friends`}>Back to Friends</Link>
                </nav>
              </div>
            }
              <pre>
                {JSON.stringify(this.state, null, 2)}
              </pre>
            </div>
        )
    }
})

module.exports = Friend
