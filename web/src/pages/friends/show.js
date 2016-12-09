const React = require('react')
const { Link, Redirect} = require('react-router')
const data = require('../../utils/data')()
const confirm = require('react-confirm2')
const Friend = React.createClass({
  getInitialState(){
    return {
      friend: {
        id: '',
        name: ''
      },
      remove: false
    }
  },
  componentDidMount() {
    data.get('friends', this.prop.params.id)
    .then(friend => this.setState({friend}))
  },
  handleRemove(e){
    e.preventDefault()
    confirm('Are you sure you want to remove this Friend?', () => {
      data.remove('friends', this.props.params.id, this.state.friend)
        .then(response => this.setState({removed: true}))
    })
  },
    render() {
        return (
            <div>
              {this.state.removed ? <Redirect to='/friends' /> : null}
                <h3>{this.state.friend.name}</h3>
                <Link to={`/friends/${this.state.friend.id}/edit`}>Edit</Link>
                <a href="" onClick={this.handleRemove}>Remove Circle</a>
                <Link to='/friends'>Back to Friends</Link>
            </div>
        )
    }
})

module.exports = Friend
