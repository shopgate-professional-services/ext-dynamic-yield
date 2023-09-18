import { SET_REQUEST_ACTIVATION } from '../constants';

/**
 * Set the "active" property to true.
 * @param {boolean} [active=true] Whether to active test requests
 * @return {Object}
 */
export const setRequestActivation = active => ({
  type: SET_REQUEST_ACTIVATION,
  active,
});
