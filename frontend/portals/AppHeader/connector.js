import { connect } from 'react-redux';
import { activateTestRequests } from '../../actions';

/**
 * Maps the contents of the state to the component props.
 * @param  {Function} dispatch The redux dispatch function.
 * @return {Object} The extended component props.
 */
const mapDispatchToProps = dispatch => ({
  triggerTestRequests: () => dispatch(activateTestRequests()),
});

export default connect(null, mapDispatchToProps);
