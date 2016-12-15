const React = require('react')
const data = require('../../utils/data')()
const { Link , Redirect } = require('react-router')
const Confirm = require('../../components/confirm.js')
const Circle = React.createClass({
  getInitialState() {
    return {
      circle: {
        id: '',
        title: '',
        friends: []
      },
      resolved: false
    }
  },
  componentDidMount() {
    data.get('circles', this.props.params.id)
    .then(circle => this.setState({circle}))
  },
  handleRemove(e) {
    e.preventDefault()
    this.setState({showconfirm: true})
   },
  handleConfirm(e) {
    data.remove('circles', this.props.params.id, this.state.c)
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
  render () {
    return (
      <div>
        {this.state.resolved ? <Redirect to='/circles' /> : null}

        {this.state.showconfirm ?

          <Confirm
            msg="Are you sure?"
            onCancel={this.handleCancel}
            onConfirm={this.handleConfirm} /> : null}

            {this.state.showconfirm ? null : <div className="fw1 tc san francisco">
              <h1 className="fw1 tc san francisco">All about that Circle</h1>
              <article className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10 shadow-5">
                <div className="tc">
                  <img src="http://fillmurray.com/200/300" class="br-100 h3 w3 dib" title="friend-profile-card"/>
                  <h2 className="fw1 f4 tc san francisco">{this.state.circle.title}</h2>
                  <hr className="mw3 bb bw1 b--black-10"/>
                </div>
                <p className="lh-copy measure center f6 black-70">
                  <a className="link hover-bg moon-gray san francisco db" href={this.state.circle.title}>Email {this.state.circle.title}
                  </a>
                </p>
              </article>


          {/* <nav>
            <Link to={`/circles/${this.state.circle._id}/edit`}>Edit</Link>
            <a href="#" onClick={this.handleRemove}>Remove Circle</a>
            <Link to={`/circles`}>Return</Link>
            </nav> */}
          <footer className="pv4 ph3 ph5-m ph6-l mid-gray">
            <div className="f6 db tc">Manage {this.state.circle.name}</div>
            <div className="tc mt3">
              <Link to={`/circles/${this.state.circle._id}/edit`}
                className="f6 dib ph2 link mid-gray dim">
                Update</Link>
                <a href="#" className="f6 dib ph2 link mid-gray dim" onClick={this.handleRemove}>Remove Circle</a>

              <Link to={`/circles`}
                className="f6 dib ph2 link mid-gray dim">
                Back to My Circles</Link>
            </div>
          </footer>
        </div>
        }
      </div>
    )
  }
})

module.exports = Circle
