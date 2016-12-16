const React = require('react')
const data = require('../../utils/data')()
const { pluck } = require('ramda')
const { Link, Redirect } = require('react-router')
const CircleForm = React.createClass({
  getInitialState() {
    return {
      circle: {
        title: '',
        email: '',
        friends: []
      },
      resolved: false
    }
  },
  componentDidMount() {
    if (this.props.params.id) {
      data.get('circles', this.props.params.id)
      .then(circle => this.setState({circle}))
    }
  },
  handleChange(field) {
    return (e) => {
      let circle = {...this.state.circle}
      circle[field] = e.target.value
      this.setState({circle})
    }
  },
  handleSubmit (e) {
   e.preventDefault()
   if (!this.state.circle._id) {
       data.post('circles', this.state.circle)
       .then(res => this.setState({ resolved: true }))
   } else {
       data.put('circles', this.state.circle._id, this.state.circle)
       .then(res =>
       this.setState({ resolved: true}))
   }
 },
  render() {
    const formState = this.state.circle._id ? 'Edit' : 'New'
    return (
      <div className="new-circle-form">
        {this.state.resolved ? <Redirect to='/circles' /> : null }
        <h1 className="fw1 san francisco tc">{formState} Circle</h1>
          <div className="circle-form pa4">
            <div className="pa4-l">
                    <form
                      onSubmit={this.handleSubmit} className="bg-light-green mw7 center pa4 br2-ns ba b--black-10">
                      <fieldset className="cf bn ma0 pa0">
                        <legend className="pt1 pb2 f5 f4-ns mb3 black-80">Circle</legend>
                        <div className="cf">
                          <label htmlFor="">Title</label>
                          <input className="f6 f5-l input-reset bn db black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns" name="title"  onChange={this.handleChange('title')}
                          value={this.state.circle.title}
                          type="big_title" />
                        </div>
                        <div className="cf">
                          <label htmlFor="">Friend</label>
                          <input className="f6 f5-l input-reset bn db black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns" name="friend"  onChange={this.handleChange('friends')}
                          value={pluck("name", this.state.circle.friends)}
                          type="big_friend"/>
                        </div>
                        <div className="cf">
                          <label htmlFor="">Friend Email</label>
                            <input className="f6 f5-l input-reset bn db black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns" name="Friend_Email_Address" onChange={this.handleChange('email')}
                          value={this.state.circle.email}
                          type="big_friend_email" />
                        </div>
                        <div className="submit-new-circle tc">
                          <input className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns" type="submit" />
                        </div>
                      </fieldset>
                    </form>
                  </div>
                </div>
              <hr/>
              <div className="tc pb2 ma4">
                <Link to={`/circles`}
                  className="f6 dib ph2 link mid-gray dim">
                  Back to My Circles</Link>
              </div>
          </div>

    )
  }
})

module.exports = CircleForm
