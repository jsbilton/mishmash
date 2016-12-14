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


      <section className="tc pa3 pa5-ns">
              <article className="hide-child relative ba b--black-20 mw5 center">
                <div className="pa2 bt b--black-20">
                  <a className="f6 db link dark-blue hover-blue" href="#">Jesse Grant</a>
                  <p className="f6 gray mv1">5 mutual friends</p>
                  <a className="link tc ph3 pv1 db bg-animate bg-dark-blue hover-bg-blue white f6 br1" href="#">Add Friend</a>
                </div>
                <a className="child absolute top-1 right-1 ba bw1 black-40 grow no-underline br-100 w1 h1 pa2 lh-solid b" href="#">×</a>
              </article>
            </section>
        return (
            <div>
              {this.state.resolved ? <Redirect to='/friends' /> : null}

              {this.state.showconfirm ?

                <section className="tc pa3 pa5-ns">
                  <article className="hide-child relative ba b--black-20 mw5 center">
                    <div className="pa2 bt b--black-20">
                      <Confirm
                        msg="Are you sure?"
                        onCancel={this.handleCancel}
                        onConfirm={this.handleConfirm} />
                    </div>

                  </article>
                </section>
                : null }

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
