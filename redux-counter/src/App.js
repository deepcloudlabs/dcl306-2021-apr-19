import Counter from "./Counter";
import {connect} from "react-redux";

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        countValue: state.count
    }
}

// Action
const increaseAction = {type: "increase"};
const decreaseAction = {type: "decrease"};

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return {
        increaseCount: function () {
            return dispatch(increaseAction);
        },
        decreaseCount: function () {
            return dispatch(decreaseAction);
        }
    }
}

// The HOC
let connectedComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter);


export default connectedComponent;
