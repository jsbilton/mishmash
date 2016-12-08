const React = require('react')
const labelStyle = { display: 'block' }
const { Link } = require('react-router')
const FriendForm = React.createClass({
    render () {
        return (
            <div>
                <h1>New Friend Form</h1>
                <div>
                    <form action="">
                        <label style={labelStyle}>First Name</label>
                        <input type="text"/>
                        <label style={labelStyle}>Last Name</label>
                        <input type="text"/>
                        <label style={labelStyle}>Phone</label>
                        <input type="text"/>
                        <label style={labelStyle}>Email</label>
                        <input type="text"/>
                    </form>
                    <Link to='/friends'>Back to Friends</Link>
                </div>
            </div>
        )
    }
})

module.exports = FriendForm
