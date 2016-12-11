const React = require('react')
const { Link, Redirect} = require('react-router')
const data = require('../../utils/data')()
const confirm = require('react-confirm2')
const Friend = React.createClass({
  getInitialState(){
    return {
      friend: '',
      resolved: false
    }
  },
  componentDidMount() {
    data.get('friends', this.prop.params.id)
    .then(friend => this.setState({friend}))
  },
  handleRemove(e){
    e.preventDefault()
      data.remove('friends', this.props.params.id)
        .then(result => this.setState({ resolved: true }))
  },
  handleConfirm(e) {
    data.remove('friends', this.props.params.id, this.state.f)
      .then(res => {
        console.log(res)
        return res
      })
      .then(res => {
        this.setState({
          deleted: true,
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
              <h1>Show</h1>
              <h3>{this.state.friend.name}</h3>
              <nav>
                <Link to={`/friends/${this.state.friend._id}/edit`}>Edit</Link>
                <a href="#" onClick={this.handleRemove}>Remove Circle</a>
                <Link to={`/friends`}>Back to Friends</Link>
              </nav>
              <pre>
                {JSON.stringify(this.state, null, 2)}
              </pre>
            </div>
        )
    }
})

module.exports = Friend
