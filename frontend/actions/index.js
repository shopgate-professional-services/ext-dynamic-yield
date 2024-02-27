import { PipelineRequest } from '@shopgate/engage/core';
import { setRequestActivation } from '../action-creators';
import { ACTIVATE_REQUESTS } from '../constants';

/**
 * Activate test requests
 * @param {Object} active Set request activation to true
 * @returns {Function}
 */
export const activateTestRequests = (active = true) => (dispatch) => {
  dispatch(setRequestActivation(active));

  return new PipelineRequest(ACTIVATE_REQUESTS)
    .setInput({ requestActivation: active })
    .dispatch();
};
