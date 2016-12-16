const React =require('react')
const StarRatingComponent = ('react-star-rating-component')

const FormComponent = React.createClass ({
    getInitialState() {
      return {
            rating: 1
      }
    },
    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue})
    },

    render() {
        const { rating } = this.state
        return (
            <div className="star-component-feature">
                <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={rating}
                    onStarClick={this.onStarClick.bind(this)}
                    starColor={`#FFD700`}
                    emptyStarColor={`#636054`}
                />
            </div>
          )
        }
      })

module.exports = FormComponent
