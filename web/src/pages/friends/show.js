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

                <section className="tc pa3 pa5-ns">
                  <article className="hide-child relative ba b--black-20 w-50 h-50 center confirm">
                    <div className="pa2 bt b--black-20">
                      <Confirm
                        className="confirm"
                        msg="Are you sure you want to Remove?"
                        onCancel={this.handleCancel}
                        onConfirm={this.handleConfirm} />
                    </div>
                  </article>
                </section>
                : null }

              {this.state.showconfirm ? null : <div className="fw1 tc san francisco">
                <h1 className="fw1 tc san francisco">All the things about my friends</h1>
                <article className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10 shadow-4">
                  <div className="tc">
                    <img src="http://fillmurray.com/200/300" class="br-100 h3 w3 dib" title="friend-profile-card" alt="friend-pic"/>
                    <h2 className="fw1 f4 tc san francisco">{this.state.friend.name}</h2>
                    <hr className="mw3 bb bw1 b--black-10"/>
                  </div>
                  <p className="lh-copy measure center f6 black-70">
                    <a className="link hover-bg moon-gray san francisco db" href={this.state.friend.email}>Email {this.state.friend.name}
                    </a>
                  </p>
                </article>
                <footer className="pv4 ph3 ph5-m ph6-l mid-gray">
                  <div className="f6 db tc">Manage {this.state.friend.name}</div>
                  <div className="tc mt3">
                    <Link to={`/friends/${this.state.friend._id}/edit`}
                      className="f6 dib ph2 link mid-gray dim">
                      Update</Link>
                      <a href="#" className="f6 dib ph2 link mid-gray dim" onClick={this.handleRemove}>Remove {this.state.friend.name}</a>
                    <Link to={`/friends`}
                      className="f6 dib ph2 link mid-gray dim">
                      Back to My Friends</Link>
                  </div>
                </footer>
              </div>
            }
            </div>
        )
    }
})

module.exports = Friend
