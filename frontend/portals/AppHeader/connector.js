import { connect } from 'react-redux';
import { setTestRequestsToActive } from '../../actions';

/**
 * Maps the contents of the state to the component props.
 * @param  {Function} dispatch The redux dispatch function.
 * @return {Object} The extended component props.
 */
const mapDispatchToProps = dispatch => ({
  activateTestRequests: () => dispatch(setTestRequestsToActive()),
});

export default connect(null, mapDispatchToProps);
