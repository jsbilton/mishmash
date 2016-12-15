const React = require('react')
const { Link } = require('react-router')
const { map } = require('ramda')
const data = require('../../utils/data')()
const Friends = React.createClass({
  getInitialState() {
    return {
      friends: []
    }
  },
  componentDidMount() {
    data.list('friends')
      .then(friends => {
        console.log(friends)
        this.setState({friends: friends.rows})
      })
      .catch(err => console.log("error", err.message))
  },
  render () {
    const transform = map(f => {
      return <li className="grow ph3 f3-ns dib br-2 pv3 bb b--light-silver" key={f.doc.name}><Link to={`/friends/${f.id}/show`}>{f.doc.name}</Link>
    </li>
  })
    return (
      <section className="mw5 mw7-ns center pa3 ph5-ns">
        <h1 className="fw1 san francisco mt0">Say hello to my little friends</h1>
        <div className="mw5 mw7-ns center pa3 ph5-ns">
            <ul className="fw1 list pl0 shadow-5 ml0 no-underline center mw6 link ba b--light-silver br2">
              {transform(this.state.friends)}
            </ul>
        </div>
        <div className="add-a-friend-button tc">
            <Link to="/friends/new" className="f6 grow br-pill ba bw2 ph3 pv2 mb2 dib dark-blue" href="#0">Add A Friend</Link>
        </div>
    </section>
    )
  }
})

module.exports = Friends
